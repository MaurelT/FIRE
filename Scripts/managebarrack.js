
var lat = 43.310213;
var lon = 5.369871;

var macarte = null;

var barrackId = null;

window.onload = function start() {
  initMap();
  addMarker(lat, lon);
};

$(document).ready(function() {
  $('#box').hScroll(1350); // You can pass (optionally) scrolling amount
});

function initBarrack(id, bc) {
  barrackId = id;
  getCaserne(id);
  initMap();
  getCamion();
  getAllTeams();
  getTeam();
  initButtonFct(id, bc);
  getUserList();
}

function initButtonFct(id, bc) {
  $('#editBarrack').click(function () {
    $('#editBarrackModal').modal();
  });

  $('#addtruck').click(function () {
    bc.load('createtruck.html', function () {
      initButtonCreateTruck(id, bc);
    });
  });

  $('#addTeam').click(function () {
    bc.load('createteam.html', function () {
      initButtonCreateTeam(id, bc);
    });
  });

  $('#modal-barrack-save').click(function () {
    var name = $('#modal-barrack-name').val();
    console.log("name");
    console.log(name);
    updateCaserne(name, barrackId);
  });
}

function getAllTeams() {
  let userTmp = JSON.parse(GetCookie("UserTmp"));
  let token = userTmp['token'];

  let url = ApiUrl + "Equipe/equipe.php?caserne_id=" + barrackId;

  $.ajax({
    type: "GET",
    url: url,
    headers: {'Authorization': token},
    dataType:"JSON",
    success: function(response) {
      fillBarrackTeams(response['Equipe']);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log("textStatus : " + textStatus + ", errorThrown : " + errorThrown);
      alert("An error happened");
    }
  });
}

function fillBarrackTeams(teams) {

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
      fillTrucks(response['Camion']);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log("textStatus : " + textStatus + ", errorThrown : " + errorThrown);
      alert("An error happened");
    }
  });
}

function fillTrucks(trucks) {
  var cnt = 0;
  var append = "";

  while (cnt < trucks.length) {
    append += "<div class='col p-0'>";
    append += "<ul class='m-0 facet-list ui-sortable'>";
    append += '<li class="facet">';
    append += '<img class="panel-icon m-2" src="Images/fire-truck.png">'+ trucks[cnt].immatriculation +'<img name="deleteTruck" id="'+ trucks[cnt].id +'" class="delTeamMember iconeslist m-2" src="Images/Icons/delete.png">';
    append += "</li>";
    append += "</ul>";
    append += "</div>";
    cnt += 1;
  }
  $("#bus_container").append(append);
  initDelTruck();
}

function initDelTruck() {
  $('[name ="deleteTruck"]').click(function () {
    deleteCamion(this.id);
  });
}

function deleteCamion(id) {
  let userTmp = JSON.parse(GetCookie("UserTmp"));
  let token = userTmp['token'];

  console.log(ApiUrl + "Camion/delete.php?id="+id);

  $.ajax({
    type: "POST",
    url: ApiUrl + "Camion/delete.php?id="+id,
    headers: {'Authorization': token},
    success: function(response) {
      $("#bus_container").empty();
      getCamion();
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
  var teamList = [];
  var userTmp = null;
  var i = 0;
  var n = 0;
  var tmp_team = null;

  while (cnt < team.length) {
    tmp_team = team[cnt]['id_users'];
    i = 0;
    userTmp = [];
    while (i < tmp_team.length) {
      n = 0;
      while (n < userList.length) {
        if (tmp_team[i] === userList[n]['id']) {
          userTmp.push(userList[n]);
        }
        n += 1;
      }
      i += 1;
    }
    cnt += 1;
    teamList.push(userTmp);
  }
  console.log(teamList);
  console.log("userlist=");
  console.log(userList);
  fillTeam(teamList, team);
}

function fillTeam(teamList,team) {
  var cnt = 0;
  var append = "";
  var i = 0;
  var tmp_team;

  console.log("TEAM TEAMTEAM");
  console.log(team);
  while (cnt < teamList.length) {
    tmp_team = teamList[cnt];
    i = 0;
    append += "<div class='col p-0'><ul class='m-0 facet-list ui-sortable'>";
    while (i < tmp_team.length) {
      append += '<li class="facet"><img class="rprofil m-2" src="Images/Icons/pompier.png" id="profil_photo">'
          + tmp_team[i].user_name +
          '<img id="' + tmp_team[i].id + '" name="'+ team[cnt].id +'" class="delTeamMember iconeslist m-2" src="Images/Icons/delete.png"></li>';
      i += 1;
    }
    append += "</ul></div>";
    cnt += 1;
  }
  console.log(append);
  $("#team_container").append(append);
  initDelTeamMember();
}

function initDelTeamMember() {
  $(".delTeamMember").click(function () {
    var id = $(this).attr('id');
    var teamId = $(this).attr('name');
    let userTmp = JSON.parse(GetCookie("UserTmp"));
    let token = userTmp['token'];

    console.log(ApiUrl + "Equipe/update.php?id="+ teamId + "&remove_user=" + id);

    $.ajax({
      type: "PUT",
      url: ApiUrl + "Equipe/update.php?id="+ teamId + "&remove_user=" + id,
      headers: {'Authorization': token},
      dataType:"JSON",
      success: function(response) {
        console.log("User deleted");
        $("#team_container").empty();
        getTeam();
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("textStatus : " + textStatus + ", errorThrown : " + errorThrown);
      }
    });
  });
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

/* Fct Call API Pour récupérer la liste de tous les utilisateurs */
function getUserList() {
  let userTmp = JSON.parse(GetCookie("UserTmp"));
  let token = userTmp['token'];

  $.ajax({
    type: "GET",
    url: ApiUrl + "User/user.php",
    headers: {'Authorization': token},
    dataType:"JSON",
    success: function(response) {
      fillUsers(response['Users']);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log("textStatus : " + textStatus + ", errorThrown : " + errorThrown);
    }
  });
}

/* Fonction pour remplir la liste des utilisateurs */
function fillUsers(users) {

  var cnt = 0;
  var test = "";
  while (cnt < users.length) {
    test += '<li class="facet"><img class="rprofil m-2" src="Images/Icons/pompier.png" id="profil_photo">'
        + users[cnt].user_name +
        '</li>';
    cnt += 1;
  }
  $("#usersList").append(test);
}
