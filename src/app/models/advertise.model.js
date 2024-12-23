const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advertiseSchema = new Schema({
    nameAdvertise: { type: String, maxLength: 255, required: true, },
    imageAdvertise: { type: String, maxLength: 255 , required: true},
    linkAdvertise: { type: String, maxLength: 600 },
    slug: { type: String },
}, {
    timestamps: true,
});

module.exports = mongoose.model('advertise', advertiseSchema);