const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    customerid: { type: Schema.Types.ObjectId, ref: 'customer' },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    wards: { type: String, required: true },
    address: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Address', addressSchema);
