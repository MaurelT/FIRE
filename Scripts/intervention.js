var ApiUrl = "https://www.theia-project-api.fr/";
var focusedUser = 0;

$(document).ready(function(){

    var bc = $('#bc');
    var divSelected = document.getElementsByClassName('itemPosition');
    var inprogress = document.getElementById('inprogress');
    var historic = document.getElementById('historic');
    var createintervention = document.getElementById('createintervention');

    inprogress.classList.add('selected');
    bc.load('inprogress.html', function () {
        initInProgressIntervention();
        //initMap();
    });


    $('#createintervention').click(function () {
        removeClass(divSelected, 'selected');
        bc.load('createintervention.html', function () {
            createInter(bc);
        });
    });

    $('#inprogress').click(function () {
        removeClass(divSelected, 'selected');
        inprogress.classList.add('selected');
        bc.load('inprogress.html', function () {
            initInProgressIntervention();
        });
    });

    $('#historic').click(function () {
        removeClass(divSelected, 'selected');
        historic.classList.add('selected');
        bc.load('allintervention.html', function () {
            initAllInterventions(bc, divSelected);

            /*
            initMap();
            accessIntervention(bc, divSelected);
            */
        });
    });

});

/* Fonction qui permet de supprimer une classe CSS d'une div */
function removeClass(divSelected, removeElement) {
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
function initIntervention() {
    $("#submit").click(function () {

        if (noEmptyInput() && checkPassword()) { /*
            var name = $('#name').val();
            var first_name = $('#firstName').val();
            var user_name = $('#userName').val();
            var password = $('#password').val(); //ENCRYPTER LE PASSWORD
            var rank = $('#roleSelect').val();
            var email = $('#emailAddress').val();


            let userTmp = JSON.parse(GetCookie("UserTmp"));
            let token = userTmp['token'];
            let newUser = {
                name: name,
                first_name: first_name,
                user_name: user_name,
                password: password,
                rank: rank,
                email: email
            };

            console.log("initTabOne");

            $.post({
                type: "POST",
                url: ApiUrl + "User/create.php",
                headers: {'Authorization': token},
                data: JSON.stringify(newUser),
                dataType: "JSON",
                success: function (response) {
                    $('#manageuser').trigger('click');
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("some error");
                }
            })
        */}
    })
}
