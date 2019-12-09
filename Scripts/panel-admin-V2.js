var ApiUrl = "https://www.theia-project-api.fr/";
var focusedUser = 0;

$(document).ready(function(){

    //CONTROLER DESKTOP
    var bc = $('#bc');
    var divSelected = document.getElementsByClassName('itemPosition');
    var manageuser = document.getElementById('manageuser');
    var manageBarrack = document.getElementById('manageBarrack');
    var createuser = document.getElementById('createuser');
    var createbarrack = document.getElementById('createbarrack');


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

    $('#createbarrack').click(function () {
        removeClass(divSelected, 'selected');
        bc.load('createbarrack.html', function() {
            //function creat barrack
        });
    });


    $('#manageuser').click(function(){
      removeClass(divSelected, 'selected');
      manageuser.classList.add('selected');
        bc.load('manageuser.html', function () {
            initEmbeddedSwitchManager();

        });
    });

    $('#manageBarrack').click(function(){
      removeClass(divSelected, 'selected');
      manageBarrack.classList.add('selected');
      bc.load('allbarrack.html' , function () {
          //initMap();
          getCaserne(bc, divSelected);
          //accesBarrack(bc, divSelected);
        });
    });

    //Récupération all users
    $('#manageuser').click( function () {
        getAllUsers();
    });

    getAllUsers();
    initModifUser();

    getAllEmbedded();

});

function getAllEmbedded(userEmbedded = null) {

    let userTmp = JSON.parse(GetCookie("UserTmp"));
    let token = userTmp['token'];

    $.ajax({
        type: "GET",
        url: ApiUrl + "Embedded/embedded.php",
        headers: {'Authorization': token},
        dataType:"JSON",
        success: function(response) {
            console.log("response ==");
            console.log(response);
            createEmbeddedList(response['Embedded'], userEmbedded);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("An error happened dans getAllEmbeddedr");
        }
    });
}

function createEmbeddedList(embeddedList, userEmbedded) {

    var i = 0;
    var embed = "";
    var n = 0;
    var isDel = false;



    if (userEmbedded != null) {
        while (i < embeddedList.length) {
            n = 0;
            while (n < userEmbedded.length) {
                if (embeddedList[i].id === userEmbedded[n].id) {
                    console.log(embeddedList[i].id + " " + userEmbedded[n].id);
                    embeddedList.splice(i, 1);
                    isDel = true;
                }
                n += 1;
            }
            if (!isDel) {
                console.log("del false");
                i += 1;
            } else {
                console.log("del true");
                isDel = false;
            }
        }
    }

    i = 0;
    console.log("Embeddedlist = ");
    console.log(embeddedList);
    while (i < embeddedList.length) {
        embed += '<li class="facet" value="'+ embeddedList[i].id +'">';
        embed += '<img class="iconeslist m-2" src="Images/Icons/embedded-icon.png">';
        embed += 'Système Embarqué ' + embeddedList[i].id;
        embed += '<img class="on_off_icon m-2" src="Images/Icons/on.png" id="connected_icone"></li>';
        i += 1;
    }
    $('#userFacets').empty();
    $('#userFacets').append(embed);

    createEmbeddedUserList(userEmbedded);
}

function createEmbeddedUserList(userEmbedded) {

    var i = 0;
    var embed = "";

    if (userEmbedded) {
        while (i < userEmbedded.length) {
            embed += '<li class="facet" value="'+ userEmbedded[i].id +'">';
            embed += '<img class="iconeslist m-2" src="Images/Icons/embedded-icon.png">';
            embed += 'Système Embarqué ' + userEmbedded[i].id;
            embed += '<img class="on_off_icon m-2" src="Images/Icons/on.png" id="connected_icone"></li>';
            i += 1;
        }
    }

    $('#allFacets').empty();
    $('#allFacets').append(embed);

    initEmbeddedSwitchManager();
}

function fillEmbeddedUser(i) {
    var userId = userList[i].id;

    let userTmp = JSON.parse(GetCookie("UserTmp"));
    let token = userTmp['token'];

    $.ajax({
        type: "GET",
        url: ApiUrl + "/Embedded/embedded.php?user_id="+ userId,
        headers: {'Authorization': token},
        dataType:"JSON",
        success: function(response) {
            console.log(response['Embedded']);
            getAllEmbedded(response['Embedded']);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            getAllEmbedded(null);
            alert("An error happened dans le call 'Rien'");
        }
    });
}

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

function unassignUserFromEmbedded(embeddedId) {


    let userTmp = JSON.parse(GetCookie("UserTmp"));
    let token = userTmp['token'];


    $.ajax({
        type: "PUT",
        url: ApiUrl + "/embedded/update.php?id="+ embeddedId +"&remove_user="+ focusedUser,
        headers: {'Authorization': token},
        dataType:"JSON",
        success: function(response) {
            console.log("UserId " + focusedUser + " unsigned from embeddedId " + embeddedId);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("An error happened");
        }
    });
}

function assignUserToEmbedded(embeddedId) {
    let userTmp = JSON.parse(GetCookie("UserTmp"));
    let token = userTmp['token'];

    $.ajax({
        type: "PUT",
        url: ApiUrl + "/embedded/update.php?id="+ embeddedId +"&insert_user="+ focusedUser,
        headers: {'Authorization': token},
        dataType:"JSON",
        success: function(response) {
            console.log("UserId " + focusedUser + " assigned from embeddedId " + embeddedId);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("An error happened");
        }
    });
}

/* Fonction pour gérer les drag and drop pour assigner et désassigner un utilisateur à un Embedded */
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
                        console.log($(item)[0].value);
                        unassignUserFromEmbedded($(item)[0].value);
                        $(item).appendTo($('#userFacets')).fadeIn('slow');
                    });
                } else if (e.currentTarget.id === 'userFacets' ) {
                    //move from user to all
                    $(item).fadeOut('fast', function() {
                        console.log("assigner embedded à un utilisateur DB click");
                        console.log($(item)[0].value);
                        assignUserToEmbedded($(item)[0].value);
                        $(item).appendTo($('#allFacets')).fadeIn('slow');
                    });
                }
            })
            .droppable({
            drop: function(e) {

                /* NOT WORKING ATM */

                var target = e.target;
                //var item = $(this).data().uiSortable.currentItem[0].id;

                console.log(target);

                console.log("e");
                console.log(e.currentTarget);

                var test = $(this).data().uiSortable.currentItem;
                console.log("test =");
                console.log(test);

                if (target.id === 'allFacets') {
                    console.log(e);
                    console.log("Assigner à utilisateur drop");
                }
                else if (target.id === 'userFacets') {
                    console.log("Désassigner d'un utilisateur drop");
                }
            }
        });
    });
}

/* Fonction qui permet de supprimer une classe CSS d'une div */
function removeClass(divSelected, removeElement) {
    console.log(divSelected);
  for(var i=0; i < divSelected.length; i++){
    var parentElement = divSelected[i];
    var childClassList= parentElement.getElementsByClassName(removeElement);
    for (var j= 0; j < childClassList.length; j++){
      var child = childClassList[j];
      child.classList.remove("selected");
    }
  }
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


//Fct pour vérifier que le password soit assez sécure et qu'il match avec le confirmPassword
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

/* Fct qui vérifie qu'aucun champs n'est vide pour la création d'un user sur le modal */
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

var userList = null;
var userCnt = 0;

/* Fct Call API Pour récupérer la liste de tous les utilisateurs */
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

/* Fonction pour remplir la liste des utilisateurs */
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
        focusedUser = userList[i].id;
        fillUser(i);
        fillEmbeddedUser(i);
    });

    initEditProfileManager();
}

/* Fonction pour remplir les infos d'un utilisateur lorsqu'on clique dessus */
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


/* Fonction qui prérempli les informations d'un utilisateur sur le modal pour modifier ses infos */
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

/* Fct pour récupérer les infos d'un utilisateur et les modifier en faisant un Call API */
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
