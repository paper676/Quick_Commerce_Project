const mongoose =require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    offerPrice:{
        type:Number,
        require:true
    },
    description:{
        type:Array,
        require:true,
    },
    images:{
        type:Array,
        require:true,
    },
    category:{
        type:Array,
        require:true,
    },
    inStock:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

module.exports=mongoose.model('product',productSchema);