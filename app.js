'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const compression = require('compression');
const request = require('request');
const Showtimes = require('showtimes');
const googleMaps = require("googlemaps");
var publicConfig = {
  key: "AIzaSyAzKDERDNU-xk5C6T1lu-u4_UWOE_wv8aY",
  stagger_time: 1000,
  secure: true
}

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

app.get('/restaurants', function(req, res){
  res.set('content-type', 'application/json');
  if (!req.query.latitude || !req.query.longitude) {
  	return res.status(400).end();
  }	
  
  request({
  	url: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
  	qs: {
  	  radius: 1000,
  	  type: 'restaurant',
  	  key: process.env.GOOGLE_PLACES_API_KEY,
  	  query: 'restaurant',
  	  location: `${req.query.latitude},${req.query.longitude}`
  	}
  }, (error, response, body) => {
  	if (error) {
  	  return res.status(500).end();
  	}
  	try {
  	  var data = JSON.parse(body);
  	  console.log(data);
  	  if (data.results) {
  	    res.status(200).send(
  		  data.results.map((place) => {
  		    return {
  			  address: place.formatted_address,
  			  geometry: place.geometry,
  			  name: place.name,
  			  place_id: place.place_id
  			};
  		  })
  		);
  	  } else {
  	  res.status(400).send([]);
  	  }
  	} catch (e) {
  	  console.error(e.stack);
  	  res.status(500).end();
  	}
  });
});

app.listen(port);
console.log('Server started on port ' +port+ ".");