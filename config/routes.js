var express = require('express');
var router = express.Router();

router.get('/', function(request, response) {
  response.render('index', {
  	header: 'Dinner And A Movie',
  	blurb: 'Enter the ZIP code of where you want to see a movie.'
  });
});

module.exports = router;