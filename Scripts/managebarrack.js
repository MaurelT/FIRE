
var lat = 43.310213;
var lon = 5.369871;

var macarte = null;

var barrackId = null;

window.onload = function start() {
  initMap();
  addMarker(lat, lon);
};

function initBarrack(id) {
  barrackId = id;
  getCaserne(id);
  initMap();
  getCamion();
  getTeam();
  initButtonFct();
}

function initButtonFct() {
  $('#editBarrack').click(function () {
    $('#editBarrackModal').modal();
  });

  $('#modal-barrack-save').click(function () {
    var name = $('#modal-barrack-name').val();
    console.log("name");
    console.log(name);
    updateCaserne(name, barrackId);
  });
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

function updateCaserne(name, id) {
  let userTmp = JSON.parse(GetCookie("UserTmp"));
  let token = userTmp['token'];
  let newCaserne = { name:name, id:id };

  $.ajax({
    type: "PUT",
    url: ApiUrl + "Caserne/update.php?id="+ id +"&name=" + name,
    headers: {'Authorization': token},
    data: JSON.stringify(newCaserne),
    dataType:"JSON",
    success: function(response) {
      $('#barrackName').text(name);
      $('#editBarrackModal').modal('toggle');
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log("textStatus : " + textStatus + ", errorThrown : " + errorThrown);
      alert("An error happened");
    }
  });
}

function getCaserne(id) {
  let userTmp = JSON.parse(GetCookie("UserTmp"));
  let token = userTmp['token'];

  $.ajax({
    type: "GET",
    url: ApiUrl + "Caserne/caserne.php?id="+id,
    headers: {'Authorization': token},
    dataType:"JSON",
    success: function(response) {
      console.log(response);
      $('#barrackName').text(response['name']);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log("textStatus : " + textStatus + ", errorThrown : " + errorThrown);
      alert("An error happened");
    }
  });
}

function getCamion(id) {
  let userTmp = JSON.parse(GetCookie("UserTmp"));
  let token = userTmp['token'];

  let url = ApiUrl + "Camion/camion.php";

  if (id !== undefined) {
    url = url + "?id=" + id;
  }

  $.ajax({
    type: "GET",
    url: url,
    headers: {'Authorization': token},
    dataType:"JSON",
    success: function(response) {
      console.log(response);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log("textStatus : " + textStatus + ", errorThrown : " + errorThrown);
      alert("An error happened");
    }
  });
}

function getTeam() {
  let userTmp = JSON.parse(GetCookie("UserTmp"));
  let token = userTmp['token'];

  let url = ApiUrl + "Equipe/equipe.php?caserne_id=" + barrackId;

  $.ajax({
    type: "GET",
    url: url,
    headers: {'Authorization': token},
    dataType:"JSON",
    success: function(response) {
      getAllUsers(response['Equipe']);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log("textStatus : " + textStatus + ", errorThrown : " + errorThrown);
      alert("An error happened");
    }
  });
}

/* Do not watch this. */
function getAllTeamUser(team, userList) {
  var cnt = 0;

  var teamList = [[]];

  console.log("test");
  console.log(team);

  var i = 0;
  var n = 0;
  var tmp_team = null;
  while (cnt < team.length) {
    tmp_team = team[cnt]['id_users'];
    i = 0;
    while (i < tmp_team.length) {
      if (tmp_team[i] !== 0) {
        n = 0;
        while (n < userList.length) {
          if (tmp_team[i] === userList[n]['id']) {
            teamList[cnt][i] = userList[n];
          }
          n += 1;
        }
      }
      i += 1;
    }
    cnt += 1;
  }
  console.log(teamList);
  fillTeam(teamList);
}

function fillTeam(teamList) {
  var cnt = 0;
  var append = "";
  var i = 0;
  var tmp_team;

  console.log("teamlist");
  console.log(teamList);
  while (cnt < teamList.length) {
    tmp_team = teamList[cnt];
    i = 0;
    console.log("First While");
    while (i < tmp_team.length) {
      console.log("Second While");
      append += '<li class="facet"><img class="rprofil m-2" src="Images/Icons/pompier.png" id="profil_photo">'
          + tmp_team[i].user_name +
          '<img class="on_off_icon m-2" src="Images/Icons/on.png"><img id="' + cnt + ',' + i + '" class="userBut iconeslist m-2" src="Images/Icons/pencil.png"></li>';
      i += 1;
    }
    cnt += 1;
  }
  console.log("test container");
  console.log(append);
  $("#team_container").append(append);
}

/* Fct Call API Pour récupérer la liste de tous les utilisateurs */
function getAllUsers(team) {
  let userTmp = JSON.parse(GetCookie("UserTmp"));
  let token = userTmp['token'];

  $.ajax({
    type: "GET",
    url: ApiUrl + "User/user.php",
    headers: {'Authorization': token},
    dataType:"JSON",
    success: function(response) {
      getAllTeamUser(team, response['Users']);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log("textStatus : " + textStatus + ", errorThrown : " + errorThrown);
    }
  });
}
