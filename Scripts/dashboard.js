/* Copyright 2018 F.I.R.E

Author : Nicolas FELTEN
Version : 0.1
Date : 12/11/2018
*/

var lat = 43.219839;
var lon = 5.520354;

var nbEmbedded = 0;
var mapList = new Array();
var marketList = new Array();

var tutoSwitch = "";

var ApiUrl = "https://www.theia-project-api.fr/";

window.onload = function start() {
    //initMap();

    if (tutoSwitch == null) {
        tutoSwitch = true;
    }

    callEmbedded();
};

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

function callEmbedded() {

    let userTmp = JSON.parse(GetCookie("UserTmp"));
    let token = userTmp['token'];

    $.ajax({
        type: "GET",
        url: ApiUrl + "Embedded/embedded.php",
        //url: "http://109.255.19.77:80/FIRE/API/Camera/camera",
        headers: {'Authorization': token},
        dataType:"JSON",
        success: function(response) {
            createEmbeddedView(response['Embedded']);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("An error happened");
        }
    });
}

function createEmbeddedView(embeddedList) {
    var i = 0;

    console.log(embeddedList);

    nbEmbedded = embeddedList.length;
    while (i < embeddedList.length) {
        var htmlText = '<div class="m-3 box-embedded">';
        htmlText += '<div class="m-4">';

        htmlText += '<div class="row">';
        htmlText += '<div class="col-md-12">';
        if (tutoSwitch == true) {
            console.log("affichées");
            htmlText += '<a class="infobulle" style="float:right;display: flex;">';
        } else {
            console.log("cachées");
            htmlText += '<a class="infobulle" style="float:right;display: none;">';
        }
        htmlText += '<img src="Images/Icons/question-mark.png">';
        htmlText += '<span>Ceci représente un système embarqué qui est disponible et actif.<br>';
        htmlText += 'Vous pouvez voir sa position sur la carte, c\'est coordonées GPS \n';
        htmlText += 'ainsi que l\'activité des capteurs et de la caméra.</span></a>';

        htmlText += '</div>';
        htmlText += '</div>';

        htmlText += '<div id="map' + i + '" class="map-view-image mt-4"></div>';
        htmlText += '</div>';
        htmlText += '<div class="row p-3 mr-2 ml-2">';
        htmlText += '<div class="col-4 text-center">';
        htmlText += '<img class="pin-size" src="Images/pin-pos.png">';
        htmlText += '</div>';
        htmlText += '<div class="col-4 text-center">';
        htmlText += '<p id="longitude" class="mt-2">43.2281,</p>';
        htmlText += '</div>';
        htmlText += '<div class="col-4 text-center">';
        htmlText += '<p id="latitude" class="mt-2">5.4300</p>';
        htmlText += '</div>';
        htmlText += '</div>';
        htmlText += '<div class="row p-3 mr-2 ml-2">';
        htmlText += '<div class="col-4 text-center">';
        htmlText += '<img class="pin-size" src="Images/signal-tower.png">';
        htmlText += '</div>';
        htmlText += '<div class="col-4 text-center">';
        htmlText += '<img class="pin-size" src="Images/checked.png">';
        htmlText += '</div>';
        htmlText += '<div class="col-4 text-center">';
        htmlText += '<img class="pin-size" src="Images/cancel.png" style="opacity:0.2;">';
        htmlText += '</div>';
        htmlText += '</div>';
        htmlText += '<div class="row p-3 mr-2 ml-2">';
        htmlText += '<div class="col-4 text-center">';
        htmlText += '<img class="pin-size" src="Images/photo-camera.png">';
        htmlText += '</div>';
        htmlText += '<div class="col-4 text-center">';
        htmlText += '<img class="pin-size" src="Images/checked.png">';
        htmlText += '</div>';
        htmlText += '<div class="col-4 text-center">';
        htmlText += '<img class="pin-size" src="Images/cancel.png" style="opacity:0.2;">';
        htmlText += '</div>';
        htmlText += '</div>';
        htmlText += '<div class="text-center mb-3 mt-3">';
        if (tutoSwitch) {
            console.log("affichées");
            htmlText += '<a class="infobulle">';
        } else {
            console.log("cachées");
            htmlText += '<a class="infobulle" style="display: none;">';
        }
        htmlText += '<img src="Images/Icons/question-mark.png">';
        htmlText += '<span>Ce bouton permet d\'accéder à la page Caméra/Carte de l\'Embedded.<br>';
        htmlText += 'Cela vous permet d\'avoir un accès au flux direct de l\'IA s\'executant sur les images ';
        htmlText += 'et données du système embarqué mais aussi aux détails des capteurs.</span></a>';
        htmlText += '<button id="details" onClick="goToEmbeddedView('+ embeddedList[i].id +')" type="submit" class="btn btn-secondary float-center">Details</button>';
        htmlText += '</div>';
        htmlText += '</div>';
        $("#bm").append(htmlText);
        i += 1;
      }
    initMap();
}

function goToEmbeddedView(id) {
    document.cookie = "EmbeddedId" + "=" + id + ";path=/";
    window.location.href = 'embedded';
}

function initMap() {

    var cnt = 0;

    while (cnt < nbEmbedded) {
        mapList.push(L.map('map' + cnt).setView([lat, lon], 11));
        L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            // Il est toujours bien de laisser le lien vers la source des données
            attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
            minZoom: 1,
            maxZoom: 20
        }).addTo(mapList[mapList.length - 1]);
        cnt += 1;
        addMarker(lat, lon, mapList.length - 1);
    }
}

var iconFolder = "images/map-icons/";

function addMarker(lat, lon, cnt) {
    if (lat != null && lon != null)
        var myIcon = L.icon({
            iconUrl: iconFolder + "hot-air-balloon.png",
            iconSize: [50, 50],
            iconAnchor: [25, 50],
            popupAnchor: [-3, -76],
        });
    var marker = L.marker([lat, lon], { icon : myIcon}).addTo(mapList[cnt]);

}


/*
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
htmlText +=
'<div class="row">';
'<div class="mr-auto ml-auto w-75">';
'<div id="map' + i + '" class="map-view-image mt-5"></div>';
'</div>';
'</div>';
'<div class="mt-3 mb-5 box-embedded">';
'<div class="row pl-3 pr-3 mt-3">';
'<div class="col-2 text-center">';
'<img class="pin-size" src="Images/pin-pos.png">';
'</div>';
'<div class="col-5 text-center">';
'<p id="longitude" class="mt-2">43.228160,</p>';
'</div>';
'<div class="col-5 text-center">';
'<p id="latitude" class="mt-2">5.430091</p>';
'</div>';
'</div>';
'<div class="row pl-3 pr-3 mt-3 mb-3">';
'<div class="col-2 text-center">';
'<img class="pin-size" src="Images/signal-tower.png">';
'</div>';
'<div class="col-5 text-center">';
'<img class="pin-size" src="Images/checked.png">';
'</div>';
'<div class="col-5 text-center">';
'<img class="pin-size" src="Images/cancel.png" style="opacity:0.2;">';
'</div>';
'</div>';
'<div class="row pl-3 pr-3 mt-3 mb-3">';
'<div class="col-2 text-center">';
'<img class="pin-size" src="Images/photo-camera.png">';
'</div>';
'<div class="col-5 text-center">';
'<img class="pin-size" src="Images/checked.png">';
'</div>';
'<div class="col-5 text-center">';
'<img class="pin-size" src="Images/cancel.png" style="opacity:0.2;">';
'</div>';
'</div>';
'<div class="text-center mb-3">';
'<button id="details" onClick="goToEmbeddedView('+ embeddedList[i].id +')" type="submit" class="btn btn-secondary float-center">Details</button>';
'</div>';
'</div>';
*/
