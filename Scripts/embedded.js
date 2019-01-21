/* Copyright 2018 F.I.R.E
Author : Nicolas FELTEN
Version : 0.1
Date : 05/11/2018
*/

var lat = 43.219839;
var lon = 5.520354;

var macarte = null;

var iconFolder = "images/map-icons/";

var isMapInit = false;

var id = -1;


$(document).ready(function() {
    $("#switchToMap").click(function (e) {
      window.location.href = 'embedded-map.html'
  });
});



$(document).ready(function() {
  $("#switchToCamera").click(function (e) {
    window.location.href = 'embedded.html'
  });
});



window.onload = function init_triggers() {
  setCaptors(14, 18, 6, 28, 148);
  //initMap();
  //addMarker(lat, lon) /
  $("#switch_to_map").click(function(){
    $("#captor_body").css("visibility", "hidden");
    $("#body").css('background-image', 'none');
    $("#body").css('background-color', "#DDDBD5")
    $("#map_body").css("visibility", "visible");
    if (!isMapInit) {
      initMap();
      addMarker(lat, lon);
      isMapInit = true
    }
  });

  $("#switch_to_camera").click(function(){
    $("#map_body").css("visibility", "hidden");
    $("#captor_body").css("visibility", "visible");
    $("#body").css('background-image', "url('images/forest_1080.png')");
  });


  id = GetCookie("EmbeddedId");
  eraseCookie("EmbeddedId");
  callEmbedded();
};

function callEmbedded() {

}



function setCaptors(wind, humidity, pression, temperature, altitude) {
  if (wind != null) {
    document.getElementById("wind-captor").innerHTML = wind + "Km/h";
  }
  if (humidity != null) {
    document.getElementById("humidity-captor").innerHTML = humidity + "%";
  }
  if (pression != null)
  {
    document.getElementById("pression-captor").innerHTML = pression + "bars";
  }
  if (temperature != null)
  {
    document.getElementById("temperature-captor").innerHTML = temperature + "°C";
  }
  if (altitude != null)
  {
    document.getElementById("altitude-captor").innerHTML = altitude + "m";
  }
}

// Fonction d'initialisation de la carte
function initMap() {
  // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
  macarte = L.map('map').setView([lat, lon], 11);
  // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
  L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    // Il est toujours bien de laisser le lien vers la source des données
    attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
    minZoom: 1,
    maxZoom: 20
  }).addTo(macarte);
}

function addMarker(lat, lon) {
  if (lat != null && lon != null && macarte != null)
    var myIcon = L.icon({
      iconUrl: iconFolder + "hot-air-balloon.png",
      iconSize: [50, 50],
      iconAnchor: [25, 50],
      popupAnchor: [-3, -76],
    });
  var marker = L.marker([lat, lon], { icon : myIcon}).addTo(macarte);
}

function getCookieVal(offset) {
  var endstr=document.cookie.indexOf (";", offset);
  if (endstr==-1) endstr=document.cookie.length;
  return unescape(document.cookie.substring(offset, endstr));
}

function GetCookie (name) {
  var arg=name+"=";
  var alen=arg.length;
  var clen=document.cookie.length;
  var i=0;
  while (i<clen) {
    var j=i+alen;
    if (document.cookie.substring(i, j)==arg) return getCookieVal (j);
    i=document.cookie.indexOf(" ",i)+1;
    if (i==0) break;
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = name+'=; Max-Age=-99999999;';
}
