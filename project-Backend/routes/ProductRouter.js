const express=require('express');
const { addProduct, productList, productById, changeStock } = require('../controllers/ProductController.js');
const { authSeller } = require('../middlewares/AuthSeller.js');
const upload = require('../configs/multer');

const ProductRouter=express.Router();

ProductRouter.post('/add', upload.array("images"), authSeller, addProduct);
ProductRouter.get('/list',productList);
ProductRouter.get('/id',productById);
ProductRouter.post('/stock',authSeller,changeStock);

module.exports=ProductRouter;