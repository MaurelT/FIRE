/* Copyright 2018 F.I.R.E
Author : Nicolas FELTEN
Version : 0.1
Date : 05/11/2018
*/

var lat = 48.815361;
var lon = 2.362765;

var macarte = null;

var iconFolder = "images/map-icons/";

var isMapInit = false;

var id = -1;

var ApiUrl = "https://www.theia-project-api.fr/";

var callEmbedded = null;

var Angle = 50;

function goToEmbedded() {
  window.location.href = 'embedded'
}

function goToMap() {
    window.location.href = 'embedded-map'
}

window.onload = function start() {

    $('#goToGraphics').click(function() {
        window.location.href = 'graphics'
    });

    callSensor();
    let second = 1000;
    callEmbedded = setInterval(callSensor, second * 5);


    let pathname = window.location.pathname;


    if (pathname.includes('embedded-map')) {
        /* Appelez fonction pour la partie embedded-map ici */
        initMap();
        addMarker(lat, lon);
        //addCircle(5, lat, lon);
        //drawCircle(5, lat, lon);
        //drawTriangle(lat, lon, Angle);
        //testCircle();
  } else {
      /* Appelez fonction pour la embedded ici */
      console.log("embedded");

  }


};

/* Permet d'arrêter le call api qui s'effectue toutes les 5 secondes pour raffraichir la valeur des capteurs */
function stopCallingEmbedded()
{
    clearInterval(callEmbedded);
}

/* Fct pour récupérer les valeur des capteurs d'un ballon grâce à son ID */
function callSensor() {
  let userTmp = JSON.parse(GetCookie("UserTmp"));
  let embeddedId = JSON.parse(GetCookie("EmbeddedId"));
  let token = userTmp['token'];

  console.log(ApiUrl + "Sensor/sensor.php?embedded_id="+embeddedId+"&quantity=1");
  console.log(token);

  $.ajax({
      type: "GET",
      url: ApiUrl + "Sensor/sensor.php?embedded_id="+embeddedId+"&quantity=1",
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

/* Fct qui parse la réponse de l'api pour le call des capteurs */
function parseResponse(response) {
    var cnt = 0;
    var wind = null;
    var humi = null;
    var pression = null;
    var temp = null;
    var altitude = null;
    var direction = null;


    response['Sensors'] = response['Sensors'].reverse();

    console.log(response['Sensors']);

    console.log(response['Sensors'][0]);

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
        else if (direction == null && response['Sensors'][cnt]['name'] == "WindDirection") {
            direction = response['Sensors'][cnt];
        }

        if (altitude != null && humi != null && pression != null && temp != null && wind != null && direction != null) {
            cnt = response['Sensors'].length;
        }
        cnt += 1;
    }

    console.log(wind, humi, pression, temp, altitude, direction);

    setCaptors(wind, humi, pression, temp, altitude, direction);

    let pathname = window.location.pathname;
    if (pathname.includes('embedded-map')) {
        /* Appelez fonction pour la partie embedded-map ici */
        deleteTriangle();

        var directionVal = direction['value'];

        if (directionVal < 0 || directionVal > 360)
            directionVal = 0;
        drawTriangle(lat, lon, directionVal);
    }

}

/* Fct qui écrit les valeurs des capteurs */
function setCaptors(wind, humidity, pression, temperature, altitude, direction) {
  if (wind != null) {
    document.getElementById("wind-captor").innerHTML = Math.round(wind['value']) + " " + wind['unit'];
  }
  if (humidity != null) {
    document.getElementById("humidity-captor").innerHTML = Math.round(humidity['value']) + " " + humidity['unit'];
  }
  if (pression != null)
  {
    document.getElementById("pression-captor").innerHTML = Math.round(pression['value']) + " " + pression['unit'];
  }
  if (temperature != null)
  {
    document.getElementById("temperature-captor").innerHTML = Math.round(temperature['value']) + " " + temperature['unit'];
  }
  if (altitude != null)
  {
      document.getElementById("altitude-captor").innerHTML = Math.round(altitude['value']) + " " + altitude['unit'];
  }
  if (direction != null && direction['value'] >= 0 && direction['value'] <= 360) {
      $('#wind-direction-img').css('transform', 'rotate('+ direction['value'] +'deg)');
      Angle = direction['value'];
      document.getElementById("wind-direction").innerHTML = getDirection(direction['value']);
  }
}

function getDirection(direction) {
    if (direction >= 0 && direction < 45) {
        return ("Nord");
    }
    if (direction >= 45 && direction < 90) {
        return ("Nord Est");
    }
    if (direction >= 90 && direction < 135) {
        return ("Est");
    }
    if (direction >= 135 && direction < 180) {
        return ("Sud Est");
    }
    if (direction >= 180 && direction < 225) {
        return ("Sud");
    }
    if (direction >= 225 && direction < 270) {
        return ("Sud Ouest");
    }
    if (direction >= 270 && direction < 315) {
        return ("Ouest");
    }
    if (direction >= 315 && direction < 360) {
        return ("Nord Ouest");
    }
}

/* Fonction d'initialisation de la carte   /!\ Ce n'est pas la meme fct que dans dashboard.  */
function initMap() {
  macarte = L.map('map').setView([lat, lon], 11);
  L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
    minZoom: 1,
    maxZoom: 20
  }).addTo(macarte);
}

/* Fonction d'ajout d'un marqueur de position sur la carte /!\ Ce n'est pas la meme fct que dans dashboard. */
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

/* Variable stockant le rayon de la terre en KM dans plusieurs unités */
let  earthRadii = {
    mi: 3963.1676,
    km: 6378.1,
    ft: 20925524.9,
    mt: 6378100,
    in: 251106299,
    yd: 6975174.98,
    fa: 3487587.49,
    na: 3443.89849,
    ch: 317053.408,
    rd: 1268213.63,
    fr: 31705.3408
};

/* Fct d'ajout d'un cercle sur la carte /!\ La carte doit être initialisée avant d'appeler cette fonction*/
function addCircle(radiusInput, lat, lng) {

    var latlng = { lat: lat, lng: lng };
    var radius = (radiusInput / earthRadii['km']) * earthRadii['mt'];
    var circle = L.circle(latlng, {
        color: '#82353b',
        fillColor: '#82353b',
        fillOpacity: 0.5,
        radius: radius
    }).addTo(macarte);

    /* Permet d'ajouter un Eventlistener lorsqu'uon clique sur le cercle
    circle.addEventListener('contextmenu', function() {
        macarte.removeLayer(this);
    });
    */
}

function drawCircle(speedWind, lat, lng) {

    var speedWind = 0.050000;

    var bounds = [[lat + speedWind, lng + speedWind], [lat - speedWind, lng - speedWind]];

    var rect = L.rectangle(bounds, {
        color: '#82353b',
        fillColor: '#82353b',
        fillOpacity : 0.5,
        weight: 1}).on('click', function (e) {
        // There event is event object
        // there e.type === 'click'
        // there e.lanlng === L.LatLng on map
        // there e.target.getLatLngs() - your rectangle coordinates
        // but e.target !== rect
        console.info(e);

    }).addTo(macarte);
}

var polygon = null;

function drawTriangle(lat, lon, angle) {

    let unit = 0.04;

    //var latlngs = [[lat + 0.2, lon - 0.2], [lat - 0.2, lon - 0.2], [lat, lon]];

    let firstPoint = translatePoint(lat, lon, angle - 10, unit);
    let secondPoint = translatePoint(lat, lon, angle + 10, unit);
    let thirdPoint = [lat, lon];


    let latlngs = [firstPoint, secondPoint, thirdPoint];

    polygon = L.polygon(latlngs, {color:'red'});
    polygon.addTo(macarte);
}

function deleteTriangle() {
    if (polygon != null) {
        macarte.removeLayer(polygon);
    }
}

//X = lat , Y = lon
function translatePoint(x, y, angle, unit) {

    var rad = degToRad(angle % 360);


    x += unit * Math.cos(rad);
    y += unit * Math.sin(rad);

    return [x, y];
}

function degToRad(degree) {
    var pi = Math.PI;
    return (pi * (degree / 180))
}
