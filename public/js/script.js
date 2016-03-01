console.log('loaded');

$('.pure-button').click(function() {
  event.preventDefault();
  zipCode = $('.pure-input').val();
  console.log("Current input is " +zipCode+ ".");
  if (zipCode.length < 5) {
  	$('#error-message').text("PLEASE ENTER A VALID 5 DIGIT ZIP CODE");
  }
  $.ajax({
  	type: "GET",
  	url: '/showtimes/'+zipCode,
  	success: function(theaters) {
  	  // $('.zip-header').text("Showtimes For " +zipCode);
  	  for (var i = 0; i < 10; i++) {
  	  	var name = theaters[i].name;
  	  	var address = theaters[i].address;
  	  	var movies = theaters[i].movies;
  	  	// var phone = theaters[i].phoneNumber;
  	  	$(".theaters-container").append("<h2>" +name+ "</h2>");
  	  	$(".theaters-container").append("<h3>" +address+ "</h3>");
  	  	// $(".theaters-container").append("<h4>" +movies+ "</h4>");
  	  	// $(".theaters-container").append("<h4>" +phone+ "</h4>");
  	  	
  	  	// var movies = theaters[i].movies
  	  	for (var i = 0; i < movies.length; i++) {
  	  	  var movie_title = movies[i].name;
  	  	  // var movie_showtimes = movies[i].showtimes;
  	  	  $(".theaters-container").append("<h4>" +movie_title+ "</h4>");
  	  	  // for (var i = 0; i < movie_showtimes.length; i++) {
  	  	  // 	$(".theaters-container").append("<p>" +movie_showtimes[i]+ "</p>");
  	  	}
  	  	$(".theaters-container").append("----------------------");
  	  }
  	}
  })
})