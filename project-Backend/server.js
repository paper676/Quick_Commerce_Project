const dotenv=require('dotenv');
dotenv.config();
const cors=require('cors');

const port=process.env.PORT || 3000;

const AllowedOrigins=['http://localhost:5173']

const express=require('express');
const app=express();

const cookieParser=require('cookie-parser');
//configs/connections
const connectToDb=require('./configs/db');
const connectToCloudinary=require('./configs/cloudinary.js');
//routes
const UserRouter = require('./routes/UserRouter.js');
const ProductRouter = require('./routes/ProductRouter.js');
const SellerRouter = require('./routes/SellerRouter.js');
const CartRouter = require('./routes/CartRouter.js');
const AddressRouter = require('./routes/AddressRouter.js');
const OrderRoter = require('./routes/OrderRouter.js');
const { stripeWebhooks } = require('./controllers/OrderController.js');
// const userRouts=require('./routes/user.routes')

app.post('/stripe',express.raw({type:'application/json'}),stripeWebhooks)

//defult middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({origin:AllowedOrigins,credentials:true}));
app.use(cookieParser());
//connections
connectToDb()
connectToCloudinary()

//api endpoints

app.get('/',(req,res)=>{res.send("hello");});
app.use('/api/user',UserRouter);
app.use('/api/seller',SellerRouter);
app.use('/api/product',ProductRouter);
app.use('/api/cart',CartRouter);
app.use('/api/address',AddressRouter);
app.use('/api/order',OrderRoter);

//running server at port
app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`);
});