$('.theaters-search').click(function() {
  event.preventDefault();
  zipCode = $('.pure-input').val();
  if (zipCode.length < 5 || zipCode.length > 5) {
  	$('#error-message').text("PLEASE ENTER A VALID 5 DIGIT ZIP CODE");
  }
  $.ajax({
  	type: "GET",
  	url: '/showtimes/'+zipCode,
  	dataType: 'json',
  	async: true,
  	beforeSend: function() {
  	  $(".mdl-spinner").addClass("is-active");
  	},
  	success: function(theaters) {
  	  $(".mdl-spinner").removeClass("is-active");
  	  for (var i = 0; i < 10; i++) {
  	  	var name = theaters[i].name;
  	  	var address = theaters[i].address;
  	  	$(".theaters-container").append("<h2>" +name+ "</h2>");
  	  	$(".theaters-container").append("<h3>" +address+ "</h3>");
  	  	
  	  	var movies = theaters[i].movies
  	  	for (var j = 0; j < movies.length; j++) {
  	  	  var movie_title = movies[j].name;
  	  	  var trailerLink = movies[j].trailer;
  	  	  $(".theaters-container").append("<h4>" +movie_title+ "</h4>");
  	  	  $(".theaters-container").append("<p>");
  	  	  
  	  	  var movie_showtimes = movies[j].showtimes;
  	  	  for (var k = 0; k < movie_showtimes.length; k++) {
  	  	    if (trailerLink === false) {
  	  	      $(".theaters-container p").last().before("<button style='margin: 4px 2px' type='submit' class='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent showtime-selector' data-theater='" +name+ "' data-address='" +address+ "' data-movie='" +movie_title+ "' data-time='" +movie_showtimes[k]+ "'>" +movie_showtimes[k]+ "</button> ");
  	  	    } else {
  	  	      var embedLink = trailerLink.replace("watch?v=", "embed/");
  	  	      $(".theaters-container p").last().before("<button style='margin: 4px 2px' type='submit' class='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent showtime-selector' data-theater='" +name+ "' data-address='" +address+ "' data-movie='" +movie_title+ "' data-trailer='" +embedLink+ "' data-time='" +movie_showtimes[k]+ "'>" +movie_showtimes[k]+ "</button> ");
  	  		  }
  	  	  }
  	  	}  
  	  $(".theaters-container").append("<br>");
  	  }
  	}
  })
});

$('.theaters-container').on("click", ".showtime-selector", function() {
  event.preventDefault();
  $(".container").empty();
  $(".container").append("<h1>Your Movie Itinerary</h1>");
  if ($(this).attr('data-trailer')) {
  	$(".container").append("<iframe width='560' height='315' src='" +$(this).attr('data-trailer')+ "' frameborder='0' allowfullscreen></iframe>");
  }
  $(".container").append("<h3>Movie:</h3><h5>" +$(this).attr('data-movie')+ "</h5>");
  $(".container").append("<h3>Showtime:</h3><h5>" +$(this).attr('data-time')+ "</h5>");
  $(".container").append("<h3>Theater:</h3><h5 data-theater>" +$(this).attr('data-theater')+ "</h5>");
  $(".container").append("<h3>Address:</h3><h5 class='theater-address'>" +$(this).attr('data-address')+ "</h5>");
  $(".wrapper").append("<div class='restaurant-container'>")
  $(".restaurant-container").append("<button type='submit' class='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent restaurant-search'>Find A Restaurant</button>");
  $(".restaurant-container").append("<div class='mdl-spinner mdl-js-spinner'></div>")
  $(".restaurant-container").append("<div style='height: 400px; width: 600px; margin-top: 10px;' id='map'></div>");
});

$("body").on("click", ".restaurant-search", function(address) {
  event.preventDefault();
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': $(".theater-address").text()}, function(results, status) {
  var latitude = results[0].geometry.location.lat();
	var longitude = results[0].geometry.location.lng();
	    
	$.getJSON(`/restaurants?latitude=${latitude}&longitude=${longitude}`, (data) => {

	  var map = new google.maps.Map($('#map')[0], {
	    center: { lat: latitude, lng: longitude},
		  scrollwheel: false,
		  zoom: 14
	  });

	  var infowindow = new google.maps.InfoWindow({
	    content: `
    		<span class="window-name">${$('[data-theater]').text().trim()}</span>
    		<br/>
    		<span class="window-address">${results[0].formatted_address}</span>
    	`
	  });

	  var marker = new google.maps.Marker({
	    map: map,
  		position: results[0].geometry.location,	
  		place: {
  		  location: results[0].geometry.location,
  		  placeId: results[0].place_id
  		},
  		title: $('[data-theater]').text().trim(),
  		icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
	  });
	  
	  marker.addListener('click', function() {
	    infowindow.open(map, marker);
	  });

	  data.forEach((place) => {
	    var latlng = new google.maps.LatLng(place.geometry.location.lat, place.geometry.location.lng);
  		
      var infowindow = new google.maps.InfoWindow({
  		  content: `
  		    <span class="window-name">${place.name}</span>
  		    <br/>
  		    <span class="window-address">${place.address}</span>
  		  `
  	  });
		
  		var marker = new google.maps.Marker({
	      map: map,
  		  position: latlng,	
  		  place: {
  		    location: latlng,
  		    placeId: place.place_id
  		  },
  		  title: place.name
	    });
	    
	    marker.addListener('click', function() {
	      infowindow.open(map, marker);
	    });

	    var restaurantName = place.name;
	    var restaurantAddress = place.address;
	    $('.restaurant-container').append("<h4>" +restaurantName+ "</h4>");
	    $('.restaurant-container').append("<p>" +restaurantAddress+ "</p>");
	    $(".restaurant-container").append("<button type='submit' class='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent restaurant-selector' data-name='" +restaurantName+ "' data-address='" +restaurantAddress+ "'>Eat Here!</button> ");
	    $(".restaurant-container").append("<br>");
	  });

	  });
  });
});

$(".wrapper").on("click", ".restaurant-selector", function() {
  event.preventDefault();
  $(".restaurant-container").empty();
  $(".restaurant-container").append("<h1>Your Meal Plans</h1>");
  $(".restaurant-container").append("<h3>Restaurant:</h3><h5>" +$(this).attr('data-name')+ "</h5>");
  $(".restaurant-container").append("<h3>Address:</h3><h5>" +$(this).attr('data-address')+ "</h5>");
});