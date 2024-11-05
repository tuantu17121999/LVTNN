const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name: { type: String, maxLength: 255, required: true, },
    foodtypeid: {
        type: Schema.Types.ObjectId,
        ref: "foodType"
    },
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    slug: { type: String },
    price: { type: Number, required: true },
}, {
    timestamps: true,
});

module.exports = mongoose.model('food', foodSchema);