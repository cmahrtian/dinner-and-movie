var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compression = require('compression');
var Showtimes = require('showtimes');
var port = process.env.PORT || 3000;
var router = require('./config/routes');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use('/', router);
app.use(compression());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/showtimes/:zip', function(req, res){
  var area = new Showtimes(req.params.zip, {});
  area.getTheaters(function (error, theaters) {
  	if (error) {
  	  throw error;
  	}
  	res.json(theaters);
  })
});

app.listen(port);
console.log('Server started on port ' +port+ ".");