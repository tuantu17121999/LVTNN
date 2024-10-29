var express = require("express");
const db = require('./config/db');
const router = require('./routes/index');
const {engine} = require('express-handlebars');
const path = require('path');

var app = express();

app.use(express.json());
db.connect();

app.listen(3000,  () => console.log('listen on port 3000'))

//cai dat handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

router(app);
