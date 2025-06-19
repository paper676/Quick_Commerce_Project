const mongoose=require('mongoose');
// const jwt=require('jsonwebtoken');
// const bcrypt=require('bcrypt');

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    cartItems:{
        type: Object,
        default:{}
    }
},{minimize:false});

// userSchema.methods.generateAuthToken=function(){
//     const token = jwt.sign({ id: this._id },process.env.JWT_SECRET,{ expiresIn: '24h' });
//     return token;
// }
// userSchema.methods.comparePassword=async function(password){
//     return await bcrypt.compare(password, this.password);
// }
// userSchema.statics.hashPassword=async function(password){
//     return await bcrypt.hash(password,10);
// }


module.exports = mongoose.models.users || mongoose.model('users',userSchema);