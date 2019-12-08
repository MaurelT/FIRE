
var lat = 43.310213;
var lon = 5.369871;

var macarte = null;

window.onload = function start() {
  initMap();
  addMarker(lat, lon);
};

function accesBarrack(bc, divSelected) {
  $("button[name = 'barrack']").click(function () {
    removeClass(divSelected, 'selected');
    bc.load('managebarrack.html', function () {
      initMap();
    });
  });
}

/* Fonction d'initialisation de la carte   /!\ Ce n'est pas la meme fct que dans dashboard.  */
function initMap() {
  macarte = L.map('mapAllBarrack').setView([lat, lon], 11);
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
