$(document).ready(function(){

   $("#edit_profil").click(function () {
       $('#myModal').modal();
   });

    let tutoSwitch = GetCookie("fire-tuto");

    if (tutoSwitch == null) {
        tutoSwitch = 'true';
    }
    checkTutoUser(tutoSwitch);

});

/* On doit garder cette fonction en double suite à une correction de bug
--> La partie manageuser est appelée une fois que la page est lancée ce qui faisait buggué certains affichage de tutoriels */
function checkTutoUser(tutoSwitch) {
    let infobulle = $(".infobulle");

    if (tutoSwitch === 'true') {
        $('.infobulle').css('display', 'block');
    } else {
        console.log("infobulles cachées");
        infobulle.attr('style', 'display:none;');
    }
}

var ApiUrl = "https://www.theia-project-api.fr/";

/* Fonction pour récupérer les infos d'un utilisateur et ouvrir le modal permettant de modifier ses informations */
function openModal(value) {

    if (value == -1) {
        alert("Vous ne pouvez pas faire cela !");
    }
    else {
        let userTmp = JSON.parse(GetCookie("UserTmp"));
        let token = userTmp['token'];
        let data = { id:value };

        $.ajax({
            type: "GET",
            url: ApiUrl + "/User/user.php",
            //url: "http://109.255.19.77:80/FIRE/API/Camera/camera",
            headers: {'Authorization': token},
            data: data,
            dataType:"JSON",
            success: function(response) {
                fillModal(response, value)
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("An error happened");
            }
        });
    }
}

/* Fonction pour préremplir un modal permettant de modifier un utilisateur */
function fillModal(parsedTab, id) {

    $('#myModal').modal();
    if (parsedTab != null) {
        $("#modal_title").text(parsedTab.name + " " + parsedTab.first_name);
        $("#modal-userName").val(parsedTab.user_name);
        $("#modal-prenom").val(parsedTab.name);
        $("#modal-nom").val(parsedTab.first_name);
        $("#modal-email").val(parsedTab.email);
        $("#modal-save").val(id);
    }

}
