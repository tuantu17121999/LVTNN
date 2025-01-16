const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const canceledOrdersSchema = new Schema({
    orderId: { type: Schema.Types.ObjectId, ref: 'order', required: true },
    reason: { type: String, required: true} ,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CanceledOrders', canceledOrdersSchema);
