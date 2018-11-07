/* Copyright 2018 F.I.R.E

Author : Nicolas FELTEN
Version : 0.1
Date : 05/11/2018
*/

window.onload = function heightWindow() {
setCaptors(14, 18, 6, 28, 148);
};

function setCaptors(wind, humidity, pression, temperature, altitude) {
  if (wind != null) {
    console.log("test");
    document.getElementById("wind-captor").innerHTML = "Vent : " + wind + "Km/h";
  }
  if (humidity != null) {
    document.getElementById("humidity-captor").innerHTML = "Humidité : " + humidity + "%";
  }
  if (pression != null)
  {
    document.getElementById("pression-captor").innerHTML = "Pression : " + pression + "bars";
  }
  if (temperature != null)
  {
    document.getElementById("temperature-captor").innerHTML = "Température : " + temperature + "°C";
  }
  if (altitude != null)
  {
    document.getElementById("altitude-captor").innerHTML = "Altitude : " + altitude + "m";
  }
}
