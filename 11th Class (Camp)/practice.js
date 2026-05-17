const clock= document.getElementById("clock");
const date= document.getElementById("date");

function updateClock(){
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  clock.textContent= `${hours}:${minutes}:${seconds}`;
  date.textContent= now.toDateString();

}

setInterval(updateClock,1000);
