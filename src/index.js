var express = require("express");
const db = require('./config/db');
const router = require('./routes/index');
const { engine } = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override'); // khai báo method-override
const upload = require('./app/middlewares/multer.js')

const Handlebars = require('handlebars');

const template = Handlebars.compile('Your template string here', {
  allowProtoPropertiesByDefault: true,
  allowProtoMethodsByDefault: true
});


var app = express();

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
app.use(express.static(path.join(__dirname, 'public')))

// cài đặt router override
app.use(methodOverride('_method'));

router(app);
