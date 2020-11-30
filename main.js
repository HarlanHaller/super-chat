const port = process.env.PORT || 3000;
const express = require('express');
const ejs = require('ejs');
const layouts = require('express-ejs-layouts');
let app = express();
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(layouts);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

var homeController = require('./controllers/homeController.js');

app.get('/', homeController.renderIndex);
app.get('/chat-area', homeController.renderChat);

var encryptHelper = require('./controllers/encryptionController');
var enc = new encryptHelper.encrypter();

var server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

var io = require('socket.io')(server);
var socketController = require('./controllers/socketController.js')(io);