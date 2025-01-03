const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderDetailsSchema = new Schema({
    foodid: {
        type: Schema.Types.ObjectId,
        ref: "food"
    },
    orderid: { type: Schema.Types.ObjectId, ref: 'order' },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    price: { type: Number, required: false }, // Lưu giá tại thời điểm đặt hàng
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('orderDetails', orderDetailsSchema);