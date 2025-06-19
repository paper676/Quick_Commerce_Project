const UserModel = require("../models/UserModel");

//Update UserCart :/api/cart/update
module.exports.updatecart = async (req, res) => {
    try {
        const { cartItems } = req.body
        const userId = req.user._id;
        await UserModel.findByIdAndUpdate(userId, { cartItems })
        res.json({ success: true, message: "cart Updated!" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}