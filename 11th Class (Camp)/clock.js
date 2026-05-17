// Get the HTML elements we want to change
var clockBox = document.getElementById("clock");
var dateBox = document.getElementById("date");

// If number is 1-9, add a "0" in front (so 5 becomes "05")
function twoDigit(number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}

function updateClock() {
  // Get the current date and time from the computer
  var now = new Date();

  var hours = twoDigit(now.getHours());
  var minutes = twoDigit(now.getMinutes());
  var seconds = twoDigit(now.getSeconds());

  // Show time like 09:05:03
  var timeText = hours + ":" + minutes + ":" + seconds;
  clockBox.textContent = timeText;

  // Show today's date
  dateBox.textContent = now.toDateString();
}

// Show the clock right away
updateClock();

// Update the clock every 1000 milliseconds (1 second)
setInterval(updateClock, 1000);
