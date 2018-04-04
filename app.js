var express = require('express');
var ejs = require('ejs');
var app = express();
var router = express.Router();
require('./wsServer');

app.use('/static', express.static(__dirname + '/static'));

app.engine('html', ejs.renderFile);
app.set('views', './');
app.set('view engine', 'html');

router.get('/', function(req, res, next) {
  res.render('index');
});

app.use('/', router);

app.listen(8000);
console.log('websocket listening on port 8000');