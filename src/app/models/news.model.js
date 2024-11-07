const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const news = new Schema({
    nameNews: { type: String, maxLength: 255, required: true, },
    imageNews: { type: String, maxLength: 255 },
    descriptionNews: { type: String, maxLength: 600 },
    slug: { type: String },
}, {
    timestamps: true,
});

module.exports = mongoose.model('news', news);