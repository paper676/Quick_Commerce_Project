const OrdersModel = require("../models/OrdersModel");
const ProductModel = require("../models/ProductModel");
const UserModel = require("../models/UserModel");
const stripe = require('stripe');
//Place order by COD: /api/order/cod
module.exports.palceOrderCOD = async (req, res) => {
    try {
        const { items, address } = req.body;
        const userId = req.user._id;
        if (!address || items.length === 0) {
            res.json({ success: false, message: "Invalid Data!" });
        }

        let amount = await items.reduce(async (acc, item) => {
            const product = await ProductModel.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)

        amount += Math.floor(amount * 0.02) //2% tax;
        
        await OrdersModel.create({
            userId,
            address,
            items,
            amount,
            paymentType: "COD",
        });

        return res.json({ success: true, message: "Order Placed Successfully!" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}
//Place order by online: /api/order/stripe
module.exports.palceOrderStripe = async (req, res) => {
    try {
        const { items, address } = req.body;
        const userId = req.user._id;
        const {origin}=req.headers;
        if (!address || items.length === 0) {
            res.json({ success: false, message: "Invalid Data!" });
        }

        let productData=[];

        let amount = await items.reduce(async (acc, item) => {
            const product = await ProductModel.findById(item.product);
            productData.push({
                name:product.name,
                price:product.offerPrice,
                quantity:item.quantity,
            })
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)

        amount += Math.floor(amount * 0.02) //2% tax;

        const order=await OrdersModel.create({
            userId,
            address,
            items,
            amount,
            paymentType: "Online",
        });

        const stripeInstance=new stripe(process.env.STRIPE_SECRET_KEY)
        const line_items=productData.map((item)=>{
            return {
                price_data:{
                    currency:"usd",
                    product_data:{
                        name:item.name,
                    },
                    unit_amount:Math.floor(item.price + item.price*0.02) * 100
                },
                quantity:item.quantity,    
            }
        })
        console.log(origin);
        //create session
        const session=await stripeInstance.checkout.sessions.create({
            line_items,
            mode:"payment",
            success_url: `${origin}/user/loader?next=order`,
            cancel_url: `${origin}/user/cart`,
            metadata:{
                orderId:order._id.toString(),
                userId:userId.toString(),
            }
        })

        return res.json({ success: true, url: session.url });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}
//stripe web-hook to conform the payment:

module.exports.stripeWebhooks= async (req, res) => {
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body, 
            sig, 
            process.env.STRIPE_WEDHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    switch (event.type) {
        case "payment_intent.succeeded":{
            const paymentIntent=event.data.object;
            const paymentIntentId=paymentIntent.id;

            const session=await stripeInstance.checkout.sessions.list({
                payment_intent:paymentIntentId,
            })

            const {orderId,userId} = session.data[0].metadata;

            await OrdersModel.findByIdAndUpdate(orderId,{isPaid:true})

            //clear cart data
            await UserModel.findByIdAndUpdate(userId,{cartItems: {}});
            break;
        }
        case "payment_intent.payment_failed":{
            const paymentIntent=event.data.object;
            const paymentIntentId=paymentIntent.id;

            const session=await stripeInstance.checkout.sessions.list({
                payment_intent:paymentIntentId,
            })

            const { orderId } = session.data[0].metadata;

            await OrdersModel.findByIdAndDelete(orderId);
            break;
        } 
        default:
            console.error(`unhandeled event type ${event.type}`)
            break;
    }

    res.status(200).json({ received: true });
};

//Get the orders by id :/api/order/user
module.exports.getUserOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await OrdersModel.find({
            userId,
            $or: [
                { paymentType: "COD" },
                { isPaid: true }
            ]
        }).populate("items.product address").sort({ createdAt: -1 });
        return res.json({ success: true, orders });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

//Get all orders for Admin :/api/order/seller
module.exports.getAllOrders = async (req, res) => {
    try {
        const orders = await OrdersModel.find({
            $or: [
                { paymentType: "COD" },
                { isPaid: true }
            ]
        }).populate("items.product address").sort({ createdAt: -1 });
        return res.json({ success: true, orders });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}