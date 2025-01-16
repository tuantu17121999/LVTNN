var express = require("express");
var app = express();

const db = require('./config/db');
const router = require('./routes/index');
const { engine } = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser'); // khai báo body HTML
const methodOverride = require('method-override'); // khai báo method-override pt PUT
const upload = require('./app/middlewares/multer.js')
const cookieParser = require('cookie-parser');
const { handleError } = require("./app/common/handleError.js");
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);

// gắn io với global
global.io = io;

io.on('connection', (socket) => {
  console.log('A user connected');
  // Bạn có thể thêm các sự kiện khác ở đây, ví dụ:
  socket.on('message', (msg) => {
    console.log('Message received: ' + msg);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// const passport = require("passport");
const passport = require("./config/passport/passport");


const Handlebars = require('handlebars');

const template = Handlebars.compile('Your template string here', {
  allowProtoPropertiesByDefault: true,
  allowProtoMethodsByDefault: true
});

app.use(cookieParser());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
db.connect();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`listen on port http://localhost:${PORT}`);
});

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