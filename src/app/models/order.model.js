const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    moneyTotal: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    finalMoney: { type: Number, required: true },
    status: { type: String, required: true },
    payment: { type: String, required: true },
    amount: { 
        type: String,
        default: ''
    },
    idAddress: { 
        type: Schema.Types.ObjectId, 
        ref: "Address", 
        equired: true},
}, {
    timestamps: true,
});

module.exports = mongoose.model('order', orderSchema);