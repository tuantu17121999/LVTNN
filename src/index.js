var express = require("express");
const db = require('./config/db');
const usersModel = require('./app/models/users.model');
const router = require('./routes/index');
var app = express();

db.connect();

app.listen(3000,  () => console.log('listen on port 3000'))

router(app);
