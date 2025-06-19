const express=require('express');
const { authUser } = require('../middlewares/AuthUser.js');
const { updatecart } = require('../controllers/CartController.js');
const CartRouter=express.Router();


CartRouter.post('/update',authUser,updatecart);

module.exports=CartRouter;