$(document).ready(function(){

   $("#edit_profil").click(function () {
       $('#myModal').modal();
   });
});

var ApiUrl = "https://www.theia-project-api.fr/";

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
