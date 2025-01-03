const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderDetailsSchema = new Schema({
    adminid: { type: Schema.Types.ObjectId, ref: 'admin', required: true },
    orderid: { type: Schema.Types.ObjectId, ref: 'order', required: true },
    name: { type: String, required: true , unique: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('orderHistory', orderDetailsSchema);