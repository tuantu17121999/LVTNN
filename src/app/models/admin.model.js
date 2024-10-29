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
    }
});

module.exports = mongoose.model('admin', adminSchema);