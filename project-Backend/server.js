const dotenv=require('dotenv');
dotenv.config();
const cors=require('cors');

const port=process.env.PORT || 3000;

const AllowedOrigins=['http://localhost:5173','https://quick-commerce-project-frontend.vercel.app']

const express=require('express');
const app=express();

app.use((req, res, next) => {
  const originalCookie = res.cookie.bind(res);
  res.cookie = function(name, value, options) {
    console.log(`[res.cookie] ${req.method} ${req.originalUrl} => name=${name}, options=${JSON.stringify(options)}`);
    return originalCookie(name, value, options);
  };

  res.on('finish', () => {
    const sc = res.getHeader('set-cookie');
    if (sc) {
      console.log(`[SET-COOKIE HEADER] ${req.method} ${req.originalUrl} =>`, sc);
    }
  });

  next();
});

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
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(AllowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(cookieParser());
//connections
connectToDb()
connectToCloudinary()

//api endpoints

app.get('/',(req,res)=>{res.send("Api is Running");});
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