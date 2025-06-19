const express=require('express');
const { authUser } = require('../middlewares/AuthUser.js');
const { authSeller } = require('../middlewares/AuthSeller.js');
const { palceOrderCOD, getUserOrder, getAllOrders, palceOrderStripe } = require('../controllers/OrderController.js');
const OrderRoter=express.Router();


OrderRoter.post('/cod',authUser,palceOrderCOD);
OrderRoter.post('/stripe',authUser,palceOrderStripe);
OrderRoter.get('/user',authUser,getUserOrder);
OrderRoter.get('/seller',authSeller,getAllOrders);


module.exports=OrderRoter;