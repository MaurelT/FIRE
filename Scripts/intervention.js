var ApiUrl = "https://www.theia-project-api.fr/";

$(document).ready(function () {

    var bc = $('#bc');
    var divSelected = document.getElementsByClassName('itemPosition');
    var inprogress = document.getElementById('inprogress');
    var historic = document.getElementById('historic');
    var createintervention = document.getElementById('createintervention');

    inprogress.classList.add('selected');
    bc.load('inprogress.html', function () {
    });


    $('#createintervention').click(function () {
        removeClass(divSelected, 'selected');
        bc.load('createintervention.html', function () {
            initIntervention();
        });
    });

    $('#inprogress').click(function () {
        removeClass(divSelected, 'selected');
        inprogress.classList.add('selected');
        bc.load('inprogress.html', function () {
            initMap();
        });
    });

    $('#historic').click(function () {
        removeClass(divSelected, 'selected');
        historic.classList.add('selected');
        bc.load('historic.html', function () {
            initMap();
        });
    });

});


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
