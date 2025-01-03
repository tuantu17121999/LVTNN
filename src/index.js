<<<<<<< HEAD
=======

>>>>>>> 210c9c87557076f94cd1f68258921f9640bba585
const db = require('./config/db');
const router = require('./routes/index');
const { engine } = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser'); // khai báo body HTML
const methodOverride = require('method-override'); // khai báo method-override pt PUT
const upload = require('./app/middlewares/multer.js')
const cookieParser = require('cookie-parser');
const { handleError } = require("./app/common/handleError.js");
<<<<<<< HEAD

// const passport = require("passport");
const passport = require("./config/passport/passport");
=======
>>>>>>> 210c9c87557076f94cd1f68258921f9640bba585

const Handlebars = require('handlebars');

const template = Handlebars.compile('Your template string here', {
  allowProtoPropertiesByDefault: true,
  allowProtoMethodsByDefault: true
});

var express = require("express");
var app = express();

app.use(cookieParser());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
db.connect();


app.listen(3000, () => console.log('listen on port 3000'))

//cai dat handlebars
app.engine('.hbs', engine({
  extname: '.hbs',
  helpers: require('./app/helpers/handlebars.js'),
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// cài đặt public folder là thư mục chữa file static
app.use(express.static(path.join(__dirname, 'public')));

// cài đặt router override
app.use(methodOverride('_method'));

router(app);
