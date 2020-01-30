
var lat = 48.815361;
var lon = 2.362765;

var macarte = null;
var mapList = new Array();

var barrackId = null;


window.onload = function start() {
  initMap();
  addMarker(lat, lon);
};

function getCaserne(bc, divSelected) {
  let userTmp = JSON.parse(GetCookie("UserTmp"));
  let token = userTmp['token'];

  $.ajax({
    type: "GET",
    url: ApiUrl + "Caserne/caserne.php",
    headers: {'Authorization': token},
    dataType:"JSON",
    success: function(response) {
      generateAllBarracks(response['Caserne'], bc, divSelected);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log("textStatus : " + textStatus + ", errorThrown : " + errorThrown);
      alert("An error happened");
    }
  });
}

function generateAllBarracks(barrackList, bc, divSelected) {

  var append = "";

  var cnt = 0;
  while (cnt < barrackList.length) {
    append += '<div class="row blockcolor mt-3 m-0">';
    append += '<div class="col-xl-6">';
    append += '<div class="row p-3">';
    append += '<img class="panel-icon ml-3 mt-auto mb-auto" src="Images/fire-station.png">';
    append += '<p class="ml-3 mt-auto mb-auto">Caserne :</p>';
    append += '<p id="name" class="ml-3 mt-auto mb-auto">'+ barrackList[cnt]['name'] +'</p>';
    append += '</div>';
    append += '<div class="row p-3">';
    append += '<img class="panel-icon ml-3 mt-auto mb-auto" src="Images/pin-pos.png">';
    append += '<p class="ml-3 mt-auto mb-auto">Adresse :</p>';
    append += '<p id="interventionAdress" class="ml-3 mt-auto mb-auto">4-10 Avenue d\'Outre Mer, 13008 Marseille</p>';
    append += '</div>';
    append += '<div class="row p-3">';
    append += '<button name="barrack" id="'+ barrackList[cnt]['id'] +'" type="button" class="btn btn-success w-100">';
    append += 'Accéder à la caserne';
    append += '</button>';
    append += '</div>';
    append += '</div>';
    append += '<div class="col-xl-6 p-0">';
    append += '<div id="mapAllBarrack'+ cnt +'" class="m-3 mh-100 map-box-barrack"></div>';
    append += '</div>';
    append += '</div>';
    cnt += 1;
  }

  $('#allbarrackcontent').append(append);
  initMap(cnt);
  accesBarrack(bc, divSelected);

}

function initMap(nbEmbedded) {

  var cnt = 0;

  while (cnt < nbEmbedded) {
    mapList.push(L.map('mapAllBarrack' + cnt).setView([lat, lon], 11));
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      // Il est toujours bien de laisser le lien vers la source des données
      attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
      minZoom: 1,
      maxZoom: 20
    }).addTo(mapList[mapList.length - 1]);
    cnt += 1;
    //addMarker(lat, lon, mapList.length - 1);
  }
}

function accesBarrack(bc, divSelected) {
  $("button[name = 'barrack']").click(function (e) {
    removeClass(divSelected, 'selected');
    console.log(e.currentTarget.id);
    bc.load('managebarrack.html', function () {
      initBarrack(e.currentTarget.id, bc);
    });
  });
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
