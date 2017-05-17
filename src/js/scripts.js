// Get the location from ipinfo.io by using an AJAX request and pass it to
//getWeather function
var xmlhttpip = new XMLHttpRequest();
xmlhttpip.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    myObj = JSON.parse(this.responseText);
    latitude = myObj.loc.split(",")[0];
    longitude = myObj.loc.split(",")[1];
    document.getElementById("lat").innerHTML = "Latitude: " + myObj.loc.split(",")[0];
    document.getElementById("long").innerHTML = "Longitude: " + myObj.loc.split(",")[1];
    //get weather info
    getWeather(latitude, longitude);
  }
};
xmlhttpip.open("GET", "http://ipinfo.io/json", true)
xmlhttpip.send();

// Get the weather from openweathermap.org by using an AJAX request
function getWeather(latitude, longitude) {
  var iconUrl = "http://openweathermap.org/img/w/"
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myWeatherObj = JSON.parse(this.responseText);

      document.getElementById("wind").innerHTML = "Wind Speed: " + myWeatherObj.wind.speed + " meters/sec";
      document.getElementById("location").innerHTML = myWeatherObj.name;
      document.getElementById("weather").innerHTML = myWeatherObj.weather[0].description;
      document.getElementById("humidity").innerHTML = "Humidity is " + myWeatherObj.main.humidity + "%";
      document.getElementById("temp").innerHTML = myWeatherObj.main.temp  + "<sup id='celsius'> &#8451;</sup></span>";
      document.getElementById("icon").innerHTML = "<img class='img-responsive' src='" + iconUrl + myWeatherObj.weather[0].icon + ".png" + "' " + "alt='weather icon'>";
    }
  };
  xmlhttp.open("GET", "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=metric&APPID=a97ac8512b855c7a557f17fa8b10d4da", true);
  xmlhttp.send();
}
// Change Temp from Celsius to Fahrenheit and back
$(document).ready(function() {
  document.getElementById("temp").onclick = function() {
    changeTemp()
  };

  function changeTemp() {
    if (document.getElementById("temp").getElementsByTagName("sup")[0].id == "fahrenheit") {
      var myCelsius = toCelsius(parseInt(document.getElementById("temp").childNodes[0].textContent));
      document.getElementById("temp").innerHTML = myCelsius + "<sup id='celsius'> \u2103</sup>";

    } else {
      var myFahrenheit = toFahrenheit(parseInt(document.getElementById("temp").childNodes[0].textContent));
      document.getElementById("temp").innerHTML = myFahrenheit + "<sup id='fahrenheit'> \u2109</sup>";


    }
    return;
  }

  function toCelsius(fahrenheit) {
    var result = (5 / 9) * (fahrenheit - 32);
    return result.toPrecision(3);
  }

  function toFahrenheit(celsius) {
    var result = ((9 / 5 * celsius)  + 32);
    return result.toPrecision(3);
  }

});
