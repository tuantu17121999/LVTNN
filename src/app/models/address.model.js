const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    name: {
        type: String
    },
    numberphone: {
        type: Number
    },
    tinh: {
        type: String
    },
    quan: {
        type: String
    },
    phuong: {
        type: String
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('address', addressSchema);