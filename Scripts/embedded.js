/* Copyright 2018 F.I.R.E

Author : Nicolas FELTEN
Version : 0.1
Date : 05/11/2018
*/

window.onload = function heightWindow() {
setCaptors(40, 18, 6, 28, 145);
};

function setCaptors(wind, humidity, pression, temperature, altitude) {
  if (wind != null)
  document.getElementById("wind-captor").innerHTML = "Vent : " + wind + "Km/h";
  document.getElementById("humidity-captor").innerHTML = "Humidité : " + humidity + "%";
  document.getElementById("pression-captor").innerHTML = "Pression : " + pression + "bars";
  document.getElementById("temperature-captor").innerHTML = "Température : " + temperature + "°C";
  document.getElementById("altitude-captor").innerHTML = "Altitude : " + altitude + "m";
}
