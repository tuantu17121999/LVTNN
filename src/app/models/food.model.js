const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name: { 
        type: String, maxLength: 255, 
        required: true,
        unique: true,
    },
    foodtypeid: {
        type: Schema.Types.ObjectId,
        ref: "foodType",
        required: true,
    },
    promotionid: { 
        type: Schema.Types.ObjectId, 
        ref: 'promotion', 
    },
    description: { type: String, maxLength: 600, required: true },
    image: { type: String, maxLength: 255, required: true },
    slug: { type: String, required: true },
    price: { type: Number, required: true },
    tag: { type: String },
}, {
    timestamps: true,
});

module.exports = mongoose.model('food', foodSchema);