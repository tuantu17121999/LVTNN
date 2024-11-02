const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodType = new Schema({
    nameType: { type: String, required: true, },
});

module.exports = mongoose.model('foodType', foodType);