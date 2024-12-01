const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    isDeleted: {
        type: Boolean
    },
    // role: {
    //     type: String,
    //     enum: [Admin, Staff]
    // }
});

module.exports = mongoose.model('admin', adminSchema);