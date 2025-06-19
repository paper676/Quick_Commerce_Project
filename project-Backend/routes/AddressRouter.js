const express=require('express');
const { authUser } = require('../middlewares/AuthUser.js');
const { addAddress, listAddress } = require('../controllers/AddressController.js');
const AddressRouter=express.Router();


AddressRouter.post('/add',authUser,addAddress);
AddressRouter.get('/get',authUser,listAddress);

module.exports=AddressRouter;
