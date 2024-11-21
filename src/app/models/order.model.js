const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    moneyTotal: { type: Number, required: true },
    status: { type: String, required: true },
    payment: { type: String, required: true },
}, {
    timestamps: true,
});

module.exports = mongoose.model('order', orderSchema);