const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')

//Login User :/api/seller/login
module.exports.sellerLogin = async (req, res) => {
    try{
        const {sellerId,password} = req.body;
        if(sellerId===process.env.SELLER_ID && password===process.env.SELLER_PASS){
            const token=jwt.sign({sellerId},process.env.JWT_SECRET,{expiresIn:'24h'},)
            res.cookie('sellerToken',token,{
                httpOnly:true,
                secure:process.env.NODE_ENV==='production',
                sameSite:process.env.NODE_ENV==='production'?'none':'strict',
                maxAge:6*60*60*1000
            })

            return res.json({success:true,message:"Seller LoggedIn!"})
        }else{
            return res.json({success:false,message:"Invalid Credentials!"})
        }
    }catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

//Login User :/api/seller/is-auth
module.exports.isSellerAuth = async (req, res) => {
    try {
        return res.json({ success:true });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

//Logout User :/api/seller/logout
module.exports.sellerLogout = async (req, res) => {
    try {
        res.clearCookie('sellerToken',{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?'none':'strict',
        })
        return res.json({success:true,message:"Seller LoggedOut!"})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}