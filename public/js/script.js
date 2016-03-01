console.log('loaded');

$('.theaters-search').click(function() {
  event.preventDefault();
  zipCode = $('.pure-input').val();
  console.log("Current input is " +zipCode+ ".");
  if (zipCode.length < 5 || zipCode.length > 5) {
  	$('#error-message').text("PLEASE ENTER A VALID 5 DIGIT ZIP CODE");
  }
  $.ajax({
  	type: "GET",
  	url: '/showtimes/'+zipCode,
  	dataType: 'json',
  	async: true,
  	success: function(theaters) {
  	  for (var i = 0; i < 10; i++) {
  	  	var name = theaters[i].name;
  	  	var address = theaters[i].address;
  	  	$(".theaters-container").append("<h2>" +name+ "</h2>");
  	  	$(".theaters-container").append("<h3>" +address+ "</h3>");
  	  	
  	  	var movies = theaters[i].movies
  	  	for (var j = 0; j < movies.length; j++) {
  	  	  var movie_title = movies[j].name;
  	  	  $(".theaters-container").append("<h4>" +movie_title+ "</h4>");
  	  	  $(".theaters-container").append("<p>");
  	  	  
  	  	  var movie_showtimes = movies[j].showtimes;
  	  	  for (var k = 0; k < movie_showtimes.length; k++) {
  	  	    $(".theaters-container p").last().before("<button type='submit' class='showtime-selector' data-theater='" +name+ "' data-address='" +address+ "' data-movie='" +movie_title+ "' data-time='" +movie_showtimes[k]+ "'>" +movie_showtimes[k]+ "</button> ");
  	  	  }
  	  	}  
  	  $(".theaters-container").append("<br>");	
  	  }
  	}
  })
});

$('.theaters-container').on("click", ".showtime-selector", function() {
  event.preventDefault();
  console.log($(this).attr('data-theater'), $(this).attr('data-address'), $(this).attr('data-movie'), $(this).attr('data-time'));
  $.ajax({
  	type: "GET",
  	url: "/selectedshowtime",
  	dataType: 'json',
  	async: true, 
  	success: function() {
  	  $(".wrapper").remove();
  	  $("body").append("<h1>Your Movie Itinerary</h1>");
  	  $("body").append("<h3>Movie:</h3><p>" +$(this).attr('data-movie')+ "</p>");
  	  $("body").append("<h3>Showtime:</h3><p>" +$(this).attr('data-time')+ "</p>");
  	  $("body").append("<h3>Theater:</h3><p>" +$(this).attr('data-theater')+ "</p>");
  	  $("body").append("<h3>Theater:</h3><p>" +$(this).attr('data-address')+ "</p>");
  	}
  })
});