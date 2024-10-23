const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/fastfood', {
            
            
            
        });
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
        console.log('Error',error);
    }
}

module.exports = { connect };