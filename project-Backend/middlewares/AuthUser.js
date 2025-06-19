const userModel = require('../models/UserModel');
// const BlacklistedTokenModel= require('../models/blacklistToken.model');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    const token =req.cookies?.token ||(req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
        return res.status(401).json({ success: false,message: 'Unauthorized' });
    }


    // const isBlacklisted=userModel.findOne({token:token});
    // if(isBlacklisted){
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
};