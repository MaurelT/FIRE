/* Copyright 2018 F.I.R.E

Author : Nicolas FELTEN
Version : 0.1
Date : 12/11/2018
*/

var lat = 43.219839;
var lon = 5.520354;

var nbEmbedded = 0;
var mapList = new Array();

window.onload = function start() {
    //initMap();
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
        url: "http://109.255.19.77:81/API/Embedded/embedded.php",
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
        htmlText += '<div class="row">'
        htmlText += '<div class="m-3 box-embedded">'
        htmlText += '<div class="m-4">'
        htmlText += '<div id="map' + i + '" class="map-view-image mt-4"></div>'
        htmlText += '</div>'
        htmlText += '<div class="row p-3 mr-2 ml-2">'
        htmlText += '<div class="col-4 text-center">'
        htmlText += '<img class="pin-size" src="Images/pin-pos.png">'
        htmlText += '</div>'
        htmlText += '<div class="col-4 text-center">'
        htmlText += '<p id="longitude" class="mt-2">43.228160,</p>'
        htmlText += '</div>'
        htmlText += '<div class="col-4 text-center">'
        htmlText += '<p id="latitude" class="mt-2">5.430091</p>'
        htmlText += '</div>'
        htmlText += '</div>'
        htmlText += '<div class="row p-3 mr-2 ml-2">'
        htmlText += '<div class="col-4 text-center">'
        htmlText += '<img class="pin-size" src="Images/signal-tower.png">'
        htmlText += '</div>'
        htmlText += '<div class="col-4 text-center">'
        htmlText += '<img class="pin-size" src="Images/checked.png">'
        htmlText += '</div>'
        htmlText += '<div class="col-4 text-center">'
        htmlText += '<img class="pin-size" src="Images/cancel.png" style="opacity:0.2;">'
        htmlText += '</div>'
        htmlText += '</div>'
        htmlText += '<div class="row p-3 mr-2 ml-2">'
        htmlText += '<div class="col-4 text-center">'
        htmlText += '<img class="pin-size" src="Images/photo-camera.png">'
        htmlText += '</div>'
        htmlText += '<div class="col-4 text-center">'
        htmlText += '<img class="pin-size" src="Images/checked.png">'
        htmlText += '</div>'
        htmlText += '<div class="col-4 text-center">'
        htmlText += '<img class="pin-size" src="Images/cancel.png" style="opacity:0.2;">'
        htmlText += '</div>'
        htmlText += '</div>'
        htmlText += '<div class="text-center mb-3 mt-3">'
        htmlText += '<button id="details" onClick="goToEmbeddedView('+ embeddedList[i].id +')" type="submit" class="btn btn-secondary float-center">Details</button>'
        htmlText += '</div>'
        htmlText += '</div>'
        htmlText += '</div>'
        $("#bm").append(htmlText);
        i += 1
      }
    initMap();
}

function goToEmbeddedView(id) {
    document.cookie = "EmbeddedId" + "=" + id + ";path=/";
    window.location.href = 'embedded.html';
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
        cnt += 1
    }
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
