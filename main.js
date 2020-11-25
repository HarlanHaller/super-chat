var port = process.env.PORT || 3000;
var express = require('express');
var ejs = require('ejs');
var layouts = require('express-ejs-layouts');
var app = express();
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

var homeController = require('./controllers/homeController.js');

app.get('/', homeController.renderIndex);
app.get('/chat-area', homeController.renderChat);

var comsController = require('./controllers/comsController.js');

app.post('/chat-area/message', comsController.handleText)

var server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});