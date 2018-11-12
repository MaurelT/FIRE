/* Copyright 2018 F.I.R.E

Author : Nicolas FELTEN
Version : 0.1
Date : 12/11/2018
*/

var error_lon = "erreur avec la longitude."
var error_lat = "erreur avec la latitude."
var error_captor = "erreur avec les capteurs."
var error_balloon = "Erreur avec l'embarqué."

window.onload = function starting() {
  setEmbeddeds();
}

function setEmbeddeds()
{
  for (i = 0; i < 4; i++) {
    //Change I par l'id de l'embarqué.
    drawEmbedded(i, 6.029696400000034,43.31456539999999, "Ok", "Ok");
  }
}

function drawEmbedded(nb, lat, lon, balloon_state, captor_state) {
  var div = '<div class="my-camera-line" align="center" style="display: inline-block; padding: 10px; margin:10px;">';
  div += '<h3>Embarqué n°'+ nb + '</h3>';
  div += '<img src="images/forest_from_sky.jpeg" alt="">';
  div += '<br>';
  div += '<div class="">';
  if (lon != null) {
    div += 'Longitude : '+ lon + '<br>';
  }
  else {
    div += 'Longitude : '+ error_lon + '<br>';
  }
  if (lat != null) {
    div += 'Latitude : '+ lat + '<br>';
  }
  else {
    div += 'Latitude : '+ error_lat + '<br>';
  }
  if (balloon_state != null) {
    div += 'État du ballon : ' + balloon_state + '<br>';
  }
  else {
    div += 'État du ballon : ' + error_balloon + '<br>';
  }
  if (captor_state != null) {
    div += 'État des capteurs : ' + captor_state;
  }
  else {
    div += 'État des capteurs : ' + error_captor;
  }
  div += '</div>';
  div += '<button class="btn btn-dark" onclick="redirectPost('+ nb +')" type="button" name="button">Plus de détails</button>';
  div += '</div>';
  $('#camera_container').append(div);
}

function redirectPost(data) {
    var form = document.createElement('form');
    document.body.appendChild(form);
    form.method = 'post';
    form.action = 'embedded.html';
    for (var name in data) {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = "id";
        input.value = data;
        form.appendChild(input);
    }
    form.submit();
}
