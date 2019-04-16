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

var callEmbedded = null;

function goToEmbedded() {
  window.location.href = '/embedded.html'
}

function goToMap() {
    window.location.href = '/embedded-map.html'
    initMap();
}

window.onload = function start() {
  callSensor();

  second = 1000;
  callEmbedded = setInterval(callSensor, second * 5);
};

function stopCallingEmbedded()
{
    clearInterval(callEmbedded);
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


function callSensor() {
  let userTmp = JSON.parse(GetCookie("UserTmp"));
  let embeddedId = JSON.parse(GetCookie("EmbeddedId"));
  let token = userTmp['token'];

  console.log("http://109.255.19.77:81/API/Sensor/sensor.php?embedded_id="+embeddedId+"&quantity=last");
  console.log(token);

  $.ajax({
      type: "GET",
      url: "http://109.255.19.77:81/API/Sensor/sensor.php?embedded_id="+embeddedId,
      headers: {'Authorization': token},
      success: function(response) {
          console.log(response);
          parseResponse(response);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        //console.log(textStatus);
        console.log(errorThrown);
      }
  });
}

function parseResponse(response) {
    var cnt = 0;
    var wind = null;
    var humi = null;
    var pression = null;
    var temp = null;
    var altitude = null;


    response['Sensors'] = response['Sensors'].reverse();

    console.log(response['Sensors']);


    while (cnt < response['Sensors'].length) {
        if (altitude == null && response['Sensors'][cnt]['name'] == 'Altitude')
            altitude = response['Sensors'][cnt];
        else if (humi == null && response['Sensors'][cnt]['name'] == 'Humidity')
            humi = response['Sensors'][cnt];
        else if (pression == null && response['Sensors'][cnt]['name'] == 'Pression')
            pression = response['Sensors'][cnt];
        else if (temp == null && response['Sensors'][cnt]['name'] == 'Temperature')
            temp = response['Sensors'][cnt];
        else if (wind == null && response['Sensors'][cnt]['name'] == 'Wind')
            wind = response['Sensors'][cnt];

        if (altitude != null && humi != null && pression != null && temp != null && wind != null) {
            cnt = response['Sensors'].length;
        }
        cnt += 1;
    }

    console.log(wind, humi, pression, temp, altitude);

    setCaptors(wind, humi, pression, temp, altitude);
}


function setCaptors(wind, humidity, pression, temperature, altitude) {
  if (wind != null) {
    document.getElementById("wind-captor").innerHTML = wind['value'];
  }
  if (humidity != null) {
    document.getElementById("humidity-captor").innerHTML = humidity['value'];
  }
  if (pression != null)
  {
    document.getElementById("pression-captor").innerHTML = pression['value'];
  }
  if (temperature != null)
  {
    document.getElementById("temperature-captor").innerHTML = temperature['value'];
  }
  if (altitude != null)
  {
    document.getElementById("altitude-captor").innerHTML = altitude['value'];
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

function eraseCookie(name) {
  document.cookie = name+'=; Max-Age=-99999999;';
}
