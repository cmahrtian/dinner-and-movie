console.log('loaded');

$('.theaters-search').click(function() {
  event.preventDefault();
  zipCode = $('.pure-input').val();
  console.log("Current input is " +zipCode+ ".");
  if (zipCode.length < 5 || zipCode.length > 5) {
  	$('#error-message').text("PLEASE ENTER A VALID 5 DIGIT ZIP CODE");
  }
  $.ajax({
  	type: "POST",
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
  	  	    $(".theaters-container p").last().before("<button type='submit' class='showtime-selector'>" +movie_showtimes[k]+ "</button> ");  
  	  	  }
  	  	}  
  	  $(".theaters-container").append("<p>----------------------</p>");	
  	  }
  	}
  })
});

$('.theaters-container').on("click", ".showtime-selector", function() {
  event.preventDefault();
  console.log("How can you save me and display me?");
});