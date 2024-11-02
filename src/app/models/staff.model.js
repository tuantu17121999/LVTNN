const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
    usernameNV: {
        type: String
    },
    passwordNV: {
        type: String
    },
    nameNV: {
        type: String
    },
    numberPhoneNV: {
        type: Number
    },
    gioiTinhNV: {
        type: Boolean
    },
    CCCD: {
        type: Number
    },
    trangThaiNV: {
        type: String
    }
});

module.exports = mongoose.model('staff', staffSchema);