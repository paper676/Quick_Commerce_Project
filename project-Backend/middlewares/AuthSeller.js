const jwt = require('jsonwebtoken');
module.exports.authSeller = async (req, res, next) => {
    const {sellerToken} =req.cookies;
    if (!sellerToken) {
        return res.status(401).json({success:false, message: 'Unauthorized1' });
    }

    try {
        const seller = jwt.verify(sellerToken, process.env.JWT_SECRET);
        
        if (seller.sellerId===process.env.SELLER_ID) {
            return next();
        }
        else{
            return res.status(401).json({success:false, message: 'Unauthorized' });
        }
    } catch (error) {
        return res.status(401).json({success:false, message: error.message });
    }
};