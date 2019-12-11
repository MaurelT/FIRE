
var lat = 43.310213;
var lon = 5.369871;

var macarte = null;
var mapList = [];
var bc = null;
var divSelected = null;

window.onload = function start() {
  //initMap();
  //addMarker(lat, lon);
};

function initAllInterventions(bc_tmp, divSelected_tmp) {
  bc = bc_tmp;
  divSelected = divSelected_tmp;
  getInterventions(drawInterventions);
}

function getInterventions(callBack, id) {
  let userTmp = JSON.parse(GetCookie("UserTmp"));
  let token = userTmp['token'];

  let url = ApiUrl + "Intervention/intervention.php";

  if (id !== undefined) {
    url = url + "?id=" + id;
  }

  $.ajax({
    type: "GET",
    url: url,
    headers: {'Authorization': token},
    dataType:"JSON",
    success: function(response) {
      callBack(response['Intervention']);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log("textStatus : " + textStatus + ", errorThrown : " + errorThrown);
      alert("An error happened");
    }
  });
}

function drawInterventions(interventionList) {
  var cnt = 0;
  var append = "";
  var date = "";
  console.log(interventionList);

  while (cnt < interventionList.length) {
    date = interventionList[cnt]['start'];
    append += '<div id="allintervention" class="row blockcolor m-0 mt-3">';
    append += '<div class="col-xl-6">';
    append += '<div class="row p-3">';
    append += '<img class="panel-icon ml-3 mt-auto mb-auto" src="Images/alarm.png">';
    append += '<p class="ml-3 mt-auto mb-auto">Type d\'intervention :</p>';
    append += '<p id="name" class="ml-3 mt-auto mb-auto">'+ interventionList[cnt].type +'</p>';
    append += '</div>';
    append += '<div class="row p-3">';
    append += '<img class="panel-icon ml-3 mt-auto mb-auto" src="Images/pin-pos.png">';
    append += '<p class="ml-3 mt-auto mb-auto">Adresse :</p>';
    append += '<p id="interventionAdress" class="ml-3 mt-auto mb-auto">'+ interventionList[cnt]['adresse'] +'</p>';
    append += '</div>';
    append += '<div class="row p-3">';
    append += '<img class="panel-icon ml-3 mt-auto mb-auto" src="Images/calendar.png">';
    append += '<p class="ml-3 mt-auto mb-auto">Date :</p>';
    append += '<p id="interventionAdress" class="ml-3 mt-auto mb-auto">'+ date.substr(0, date.search(" ")) +'</p>';
    append += '</div>';
    append += '</div>';
    append += '<div class="col-xl-6 p-0">';
    append += '<div id="mapAllBarrack'+ cnt +'" class="m-3 mh-100 map-box-intervention"></div>';
    append += '</div>';
    append += '<div class="row w-100 p-3 m-0">';
    append += '<button name="intervention" id="'+ interventionList[cnt].id +'" type="button" class="btn btn-success w-100">';
    append += "Accéder à l'intervention";
    append += '</button>';
    append += '</div>';
    append += '</div>';
    cnt += 1;
  }

  $('#allinterventioncontent').append(append);
  accessIntervention(bc, divSelected);
  initMap(cnt)
}

function accessIntervention(bc, divSelected) {
  let interventionBut = $("button[name = 'intervention']");

  interventionBut.click(function () {

    let id = this.id;

    removeClass(divSelected, 'selected');
    bc.load('historic.html', function () {
      initOldIntervention(id);
      //initMap();
    });
  });
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
