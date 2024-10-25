const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodTypeSchema = new Schema({
    name: {
        type: String
    }
});

module.exports = mongoose.model('foodType', foodTypeSchema);