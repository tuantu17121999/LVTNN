const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const news = new Schema({
    nameNew: { type: String, required: true },
    imageNew: { type: String },
    decriptionNew: { type: String, required: true }
});

module.exports = mongoose.model('news', news);