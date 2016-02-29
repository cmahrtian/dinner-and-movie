var Showtimes = require('showtimes');
var api = new Showtimes(10001, {});
 
// console.log(api.getTheaters);

// "user strict";

// $(.'pure-button').click(function() {
//   event.preventDefault();
//   alert("Current input is" + $('.pure-input').val());
// });

api.getTheaters(function (error, theaters) {
  if (error) {
    throw error
  }
 
  console.log(theaters[0].movies);
});