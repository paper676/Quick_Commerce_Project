const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zipcode: { type: Number, required: true },
    phone: { type: Number, required: true },
})

module.exports = mongoose.models.address || mongoose.model('address', addressSchema);