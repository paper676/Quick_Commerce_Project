const AddressModel = require("../models/AddressModel.js");


//Add Adress: /api/address/add
module.exports.addAddress =async (req,res)=>{
    try {
        const {address} =req.body;
        const userId = req.user._id;
        await AddressModel.create({...address,userId});
        res.json({success:true,message:"Address Added!"})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}
//Get Adress by id: /api/address/get
module.exports.listAddress =async (req,res)=>{
    try {
        const userId = req.user._id;
        const addresses = await AddressModel.find({ userId });
        res.json({success:true,addresses})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}