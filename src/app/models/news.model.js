const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const news = new Schema({
    nameNews: { type: String, 
        maxLength: 255, 
        required: true, 
        unique: true,
    },
    imageNews: { 
        type: String, maxLength: 255,
        required: true, 
    },
    descriptionNews: { type: String, maxLength: 600, required: true },
    slug: { type: String, required: true },
}, {
    timestamps: true,
});

module.exports = mongoose.model('news', news);