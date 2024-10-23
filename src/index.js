var express = require("express");
const db = require('./config/db');
const usersModel = require('./app/models/users.model');

var app = express();

db.connect();

app.get('/',(req,res) =>{   
    console.log('HHHHH');
    return usersModel.find({})
        .then((users) =>{
            res.send(users);
        })
        .catch((error) =>{
            console.log('Error',error);
        });
})

app.listen(3000,  () => console.log('listen on port 3000'))

