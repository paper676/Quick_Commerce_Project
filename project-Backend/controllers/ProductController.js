const cloudinary=require('cloudinary')
const ProductModel = require("../models/ProductModel.js");

//Add product : api/product/add
module.exports.addProduct = async (req, res) => {
    try {
        let ProductData=JSON.parse(req.body.productData);
        const images=req.files
        let imageUrls=await Promise.all(
            images.map(async (item)=>{
                let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
        )

        await ProductModel.create({...ProductData,images:imageUrls});

        res.json({success:true,message:"Product Uploded!"});

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}
//List product : api/product/list
module.exports.productList = async (req, res) => {
    try {
        const Products=await ProductModel.find({});
        res.json({success:true,Products});
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}
//Get product by id: api/product/id
module.exports.productById = async (req, res) => {
    try {
        const {id}=req.body;
        const Product=await ProductModel.findById({id});
        res.json({success:true,Product});
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}
//updateing InStock : api/product/stock
module.exports.changeStock = async (req, res) => {
    try {
        const {id,inStock}=req.body;
        await ProductModel.findByIdAndUpdate(id,{inStock})
        res.json({success:true,message:"Product Stock Updated!"});
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}