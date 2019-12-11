
var lat = 43.310213;
var lon = 5.369871;

var macarte = null;



window.onload = function start() {
  //initMap();
  //addMarker(lat, lon);
};

function initOldIntervention(id) {
  getInterventions(fillIntervention, id)
}

function initInProgressIntervention() {
  getInterventions(filterLastIntervention);
}

function filterLastIntervention(interventionList) {
    let intervention = interventionList['Intervention'][interventionList['Intervention'].length - 1];
    fillInterventionInProgress(intervention);
}


var transport_hospital = false;
var transport_over = false;

function fillInterventionInProgress(intervention) {
  console.log(intervention);
  if (intervention.adresse != null) {
    $('#interventionAdress').text(intervention.adresse);
    convertAddress(intervention.adresse);
  } else {
    initMap();
  }

  //intervention['numero'] = "+33658582366";
  if (intervention['numero'] != null) {
    $('#call').click(function () {
      console.log("test");
      window.location.href="tel://"+intervention['numero'];
    });
  }
  if (intervention['type'] != null) {
    $('#type').text()
  }
  if (intervention['information'] != null) {
    $('#infosup').text()
  }
  if (intervention['commentaire'] != null) {
    $('#comment').text()
  }
  if (intervention['transport'] != null && intervention['transport'] === true) {
    $('#transport_effectuer').css("display", "block");
  } else {
    $('#transport_effectuer').css("display", "none");
  }
  if (intervention['transport_hopital'] != null && intervention['transport_hopital'] === true) {
    $('#checkboxFourInput').attr('checked', true);
  }


  $('#transportBut').click(function () {
      if (transport_hospital === false) {
        transport_hospital = true;
        $('#transport_effectuer').css("display", "block");
      } else {
        transport_hospital = false;
        $('#transport_effectuer').css("display", "none");
     }
  });

  $('#checkboxFourInput').click(function () {
    transport_over = !transport_over;
  });

  $('#end_intervention').click(function () {
    console.log("transporthopital = " + transport_hospital);
    console.log("transportover =" + transport_over);
    console.log("commentaire  = " + $('#comment').val());
  });
}

function fillIntervention(intervention) {
  console.log(intervention);
  if (intervention.adresse != null) {
    $('#interventionAdress').text(intervention.adresse);
    convertAddress(intervention.adresse);
  } else {
    initMap();
  }

  //intervention['numero'] = "+33658582366";
  if (intervention['numero'] != null) {
    $('#call').click(function () {
      console.log("test");
      window.location.href="tel://"+intervention['numero'];
    });
  }
  if (intervention['type'] != null) {
    $('#type').text()
  }
  if (intervention['information'] != null) {
    $('#infosup').text()
  }
  if (intervention['commentaire'] != null) {
    $('#comment').text()
  }
  if (intervention['transport'] != null && intervention['transport'] === true) {
    $('#transport_effectuer').css("display", "block");
    console.log("display");
  } else {
    $('#transport_effectuer').css("display", "none");
    console.log("Hide");
  }
  if (intervention['transport_hopital'] != null && intervention['transport_hopital'] === true) {
    $('#checkboxFourInput').attr('checked', true);
  }
}

function convertAddress(address) {
  let api_key = "AIzaSyC61hsa0AudrhNpWh6I8kVwh2Uhj0yi16w";
  var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" +  address +"&key=" + api_key;


  $.ajax({
    type: "GET",
    url: url,
    //headers: {'Authorization': token},
    dataType:"JSON",
    success: function(response) {
      let geo = response['results'][0]['geometry'].location;
      console.log(geo);
      initMapHistoric(geo);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log("textStatus : " + textStatus + ", errorThrown : " + errorThrown);
      alert("An error happened");
    }
  });
}

function getInterventions(callBack, id) {
  let userTmp = JSON.parse(GetCookie("UserTmp"));
  let token = userTmp['token'];

  let url = ApiUrl + "Intervention/intervention.php";

  if (id !== undefined) {
    url = url + "?id=" + id;
  }

  console.log("url = " + url);

  $.ajax({
    type: "GET",
    url: url,
    headers: {'Authorization': token},
    dataType:"JSON",
    success: function(response) {
      callBack(response);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log("textStatus : " + textStatus + ", errorThrown : " + errorThrown);
      alert("An error happened");
    }
  });
}

function initMapHistoric(geo) {
  macarte = L.map('mapBarrack').setView([geo['lat'], geo['lng']], 11);
  L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
    minZoom: 1,
    maxZoom: 20
  }).addTo(macarte);
  addInterventionMarker(geo);

}

function addInterventionMarker(geo) {

  if (geo['lat'] != null && geo['lng'] != null && macarte != null)
    var myIcon = L.icon({
      iconUrl: "Images/pin-pos.png",
      iconSize: [50, 50],
      iconAnchor: [25, 50],
      popupAnchor: [-3, -76],
    });
  var marker = L.marker([geo['lat'], geo['lng']], { icon : myIcon}).addTo(macarte);
}

/* Fonction d'initialisation de la carte   /!\ Ce n'est pas la meme fct que dans dashboard.  */
function initMap() {
  macarte = L.map('mapBarrack').setView([lat, lon], 11);
  L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
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
