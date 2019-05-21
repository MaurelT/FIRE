var ApiUrl = "https://www.theia-project-api.fr/";

$(document).ready(function(){

    //CONTROLER DESKTOP
    var bc = $('#bc');
    var divSelected = document.getElementsByClassName('itemPosition');
    var manageuser = document.getElementById('manageuser');
    var manageembedded = document.getElementById('manageembedded');
    var createuser = document.getElementById('createuser');

    manageuser.classList.add('selected');
    bc.load('manageuser.html', function() {
        initEmbeddedSwitchManager();
        uniqueSwitchManager($('#usersList'));
    });

    $('#createuser').click(function () {
      removeClass(divSelected, 'selected');
      bc.load('createuser.html', function() {
        initcreateuser();
      });
    });

    $('#manageuser').click(function(){
      removeClass(divSelected, 'selected');
      manageuser.classList.add('selected');
        bc.load('manageuser.html', function () {
            initEmbeddedSwitchManager();
        });
    });

    $('#manageembedded').click(function(){
      removeClass(divSelected, 'selected');
      manageembedded.classList.add('selected');
      bc.load('manageembedded.html' , function () {
          initEmbeddedSwitchManager();
          initMap();
        });
    });

    //CONTROLER MOBILE
    var mdivSelected = document.getElementsByClassName('m-itemPosition');
    var mmanageuser = document.getElementById('m-manageuser');
    var mmanageembedded = document.getElementById('m-manageembedded');

    mmanageuser.classList.add('selected');
    bc.load('manageuser.html', function() {
        initEmbeddedSwitchManager();
    });

    $('#m-manageuser').click(function(){
      removeClass(mdivSelected, 'selected');
      mmanageuser.classList.add('selected');
        bc.load('manageuser.html', function () {
            initEmbeddedSwitchManager();
        });
    });

    $('#m-manageembedded').click(function(){
      removeClass(mdivSelected, 'selected');
      mmanageembedded.classList.add('selected');
      bc.load('manageembedded.html' , function () {
          initEmbeddedSwitchManager();
        });
    });

    //Récupération all users

    $('#manageuser').click( function () {
        getAllUsers();
    });

    getAllUsers();
    initModifUser();

});

//FUCNTION FOR CONTROLER M & D
function uniqueSwitchManager(switchable) {
  $(function() {
      switchable.sortable({
          connectWith: "ul",
          placeholder: "placeholder",
          delay: 150,
      })
          .disableSelection()
          .dblclick( function(e){
              var item = e.target;
              if (e.currentTarget.id === 'usersList') {
                $(item).fadeOut('fast', function() {
                  $(item).appendTo($('#usersList')).fadeIn('slow');
                });
              }
          });
  });

}

function initEmbeddedSwitchManager() {
    var manageuserembedded = $("#allFacets, #userFacets");

    $(function() {
        manageuserembedded.sortable({
            connectWith: "ul",
            placeholder: "placeholder",
            delay: 150
        })
            .disableSelection()
            .dblclick( function(e){
                var item = e.target;
                if (e.currentTarget.id === 'allFacets') {
                    //move from all to user
                    $(item).fadeOut('fast', function() {
                        console.log("Enlever embedded d'un utilisateur DB click");
                        $(item).appendTo($('#userFacets')).fadeIn('slow');
                    });
                } else if (e.currentTarget.id === 'userFacets' ) {
                    //move from user to all
                    $(item).fadeOut('fast', function() {
                        console.log("assigner embedded à un utilisateur DB click");
                        $(item).appendTo($('#allFacets')).fadeIn('slow');
                    });
                }
            })
            .droppable({
            drop: function(e) {

                var target = e.target;
                //var item = $(this).data().uiSortable.currentItem[0].id;


                //var test = $(this).data().uiSortable.currentItem;
                //console.log(test);

                if (target.id === 'allFacets') {
                    console.log("Assigner à utilisateur drop");
                }
                else if (target.id === 'userFacets') {
                    console.log("Désassigner d'un utilisateur drop");
                }
            }
        });
    });
}

function removeClass(divSelected, removeElement) {
  for(var i=0; i < divSelected.length; i++){
    var parentElement = divSelected[i];
    // do something to each parent as needed
    // access children of parent element
    var childClassList= parentElement.getElementsByClassName(removeElement);
    // do something with `childClassList`
    for (var j= 0; j < childClassList.length; j++){
      var child = childClassList[j];
      child.classList.remove("selected");
    }
  }
}

//REQUEST INFORMATION
var userTableListPage = 0;

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

/* INIT CREATE USER FUNCTIONS */
function initcreateuser() {
    $("#submit").click(function(){

        if (noEmptyInput() && checkPassword()) {
            var name = $('#name').val();
            var first_name = $('#firstName').val();
            var user_name = $('#userName').val();
            var password = $('#password').val(); //ENCRYPTER LE PASSWORD
            var rank = $('#roleSelect').val();
            var email = $('#emailAddress').val();


            let userTmp = JSON.parse(GetCookie("UserTmp"));
            let token = userTmp['token'];
            let newUser = { name:name, first_name:first_name, user_name:user_name, password:password, rank:rank,email:email };

            console.log("initTabOne");

            $.post({
                type: "POST",
                url: ApiUrl + "User/create.php",
                headers: {'Authorization': token},
                data: JSON.stringify(newUser),
                dataType:"JSON",
                success: function(response) {
                    $('#manageuser').trigger('click');
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert("some error");
                }
            })
        }
    })
}


//FUNCTIONS FOR initcreateuser
function checkPassword() {

    var password = $('#password').val();
    var confirmPassword = $('#confirmPassword').val();

    var upperCase= new RegExp('[A-Z]');
    var lowerCase= new RegExp('[a-z]');
    var numbers = new RegExp('[0-9]');


    if(password.match(upperCase) && password.match(lowerCase) &&   password.match(numbers)) {
        $("#password").removeClass("is-invalid");
        $("#passwordHelp").removeClass("text-danger");
        $("#passwordHelp").addClass("text-muted");
    }
    else {
        $("#password").addClass("is-invalid");
        $("#passwordHelp").addClass("text-danger");
        $("#passwordHelp").removeClass("text-muted");
    }

    if (password == confirmPassword && password.length > 7 && confirmPassword.length > 7) {
        $("#confirmPassword").removeClass("is-invalid");
        $("#confirmPasswordHelp").removeClass("text-danger");
        $("#confirmPasswordHelp").addClass("text-muted");

        return (true);
    }
    $("#confirmPassword").addClass("is-invalid");
    $("#confirmPasswordHelp").addClass("text-danger");
    $("#confirmPasswordHelp").removeClass("text-muted");
    return (false);
}

function  noEmptyInput() {
    var name = $('#name').val()
    var firstName = $('#firstName').val()
    var userName = $('#userName').val()
    var emailAddress = $('#emailAddress').val()
    var bool = true;

    if (!name.trim()) {
        $("#name").addClass("is-invalid");
        bool = false
    }
    else {
        $("#name").removeClass("is-invalid");
    }


    if (!firstName.trim()) {
        $("#firstName").addClass("is-invalid");
        bool = false;
    }
    else {
        $("#firstName").removeClass("is-invalid");
    }


    if (!userName.trim()) {
        $("#userName").addClass("is-invalid");
        bool = false;
    }
    else {
        $("#userName").removeClass("is-invalid");
    }


    if (!emailAddress.trim()) {
        $("#emailAddress").addClass("is-invalid");
        bool = false;
    }
    else {
        $("#emailAddress").removeClass("is-invalid");
    }


    return (bool);
}


  var lat = 43.219839;
  var lon = 5.520354;
// Fonction d'initialisation de la carte
function initMap() {

  // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
  macarte = L.map('map').setView([lat, lon], 11);
  // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
  L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    // Il est toujours bien de laisser le lien vers la source des données
    attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
    minZoom: 1,
    maxZoom: 20
  }).addTo(macarte);
}

var userList = null;
var userCnt = 0;

function getAllUsers() {
    let userTmp = JSON.parse(GetCookie("UserTmp"));
    let token = userTmp['token'];

    $.ajax({
        type: "GET",
        url: ApiUrl + "User/user.php",
        headers: {'Authorization': token},
        dataType:"JSON",
        success: function(response) {
            userList = response['Users'];
            fillTable(response['Users']);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("textStatus : " + textStatus + ", errorThrown : " + errorThrown);
            alert("An error happened");
        }
    });
}

function fillTable(users) {
    console.log("users =");
    console.log(users);

    var cnt = 0;
    var test = "";
    while (cnt < users.length) {
    test += '<li class="facet"><img class="rprofil m-2" src="Images/Icons/pompier.png" id="profil_photo">'
        + users[cnt].user_name +
        '<img class="on_off_icon m-2" src="Images/Icons/on.png"><img id="' + cnt + '" class="userBut iconeslist m-2" src="Images/Icons/pencil.png"></li>';
    cnt += 1;
    }
    $("#usersList").append(test);

    $(".userBut").click(function () {
        var i = $(this).attr('id');
        fillUser(i);
    });

    initEditProfileManager();
}

function fillUser(i) {
    var user = userList[i];

    userCnt = i;
    console.log("user nb=" + i);
    console.log(user);

    $('#profil-name').text(user.user_name);
    $('#user-name').text(user.name);
    //$('#user-birthday').text();
    $('#user-first-name').text(user.first_name)
    $('#user-email').text(user.email);
    //$('#user-caserne');
    $('#user-rank').text(user.rank);
}

var userId = -1;

function initEditProfileManager() {
    $("#edit_profil").click(function () {

        var user = userList[userCnt];

        userId = user.id;
        console.log("userId = " + userId);

        $('#myModal').modal();
        $("#modal-userName").val(user.user_name);
        $("#modal-prenom").val(user.first_name);
        $("#modal-nom").val(user.name);
        $("#modal-email").val(user.email);
        $('#error').css('display', 'none');
    });

}

function initModifUser() {

    $('#modal-save').click( function () {
        let userTmp = JSON.parse(GetCookie("UserTmp"));
        let token = userTmp['token'];

        let email = $('#modal-email').val();
        let nom = $('#modal-nom').val();
        let prenom = $('#modal-prenom').val();
        let userName = $('#modal-userName').val();

        console.log("userId = " + userId);

        console.log(email + "+" + nom + "+" + prenom + "+" + userName + "FIN");

        if (email != "" && nom != "" && prenom != "" && userName != "") {
            let newUser = { id:userId, name:nom, first_name: prenom, user_name:userName, email:email };
            $.ajax({
                type: "PUT",
                url: ApiUrl + "User/update",
                headers: {'Authorization': token},
                data: JSON.stringify(newUser),
                dataType:"JSON",
                success: function(response) {
                    console.log(response);
                    $('#myModal').modal('toggle');
                    $('#usersList').empty();
                    getAllUsers();
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert("Failed to update user: " + errorThrown);
                }
            });
        }
        else {
            $('#error').css('display', 'inline-block');
        }

    });
}