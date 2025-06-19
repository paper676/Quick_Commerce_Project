const express=require('express');
const { sellerLogin, sellerLogout, isSellerAuth } = require('../controllers/SellerController.js');
const { authSeller } = require('../middlewares/AuthSeller.js');

const SellerRouter = express.Router();

SellerRouter.post('/login',sellerLogin);
SellerRouter.post('/is-auth',authSeller,isSellerAuth);
SellerRouter.post('/logout',authSeller,sellerLogout);

module.exports=SellerRouter