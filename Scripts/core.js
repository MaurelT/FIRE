
/*
window.onload = function heightWindow() {
  $("#core").css("height", $(window).height() + "px" );
};*/


$(document).ready(function() {


    $("#connexion").click(function (e) {
        e.preventDefault();

        var error = 0;

        var usernameInput = $('#username');
        var passwordInput = $('#password');


        $('#password-email-error').css('display', 'none');
        $('#username-error').css('display', 'none');
        $('#password-error').css('display', 'none');
        usernameInput.css('border', '0px');
        usernameInput.addClass('border-bottom');
        passwordInput.css('border', '0px');
        passwordInput.addClass('border-bottom');



        let userName = usernameInput.val();
        let password = passwordInput.val();

        if (userName === '') {
            usernameInput.css('border', '1px solid red');
            usernameInput.removeClass('border-bottom');
            $('#username-error').css('display', 'inline-block');
            error += 1
        }
        if (password === '') {
            passwordInput.css('border', '1px solid red');
            passwordInput.removeClass('border-bottom');
            $('#password-error').css('display', 'inline-block');
            error += 1
        }

        if (error === 0) {
            $.ajax({
                type: "POST",
                url: "https://www.theia-project-api.fr/connect.php",
                data: JSON.stringify({user_name: usernameInput.val(), password: passwordInput.val()}),
                dataType: "JSON",
                success: function (response) {

                    if (response['error'] == null) {
                        deadTime = setExpTime(15, 0);
                        console.log(response);
                        document.cookie = "UserTmp" + "=" + JSON.stringify(response) +  deadTime + ";path=/";
                        window.location.href = 'dashboard';
                    }
                    else {
                        $('#password-email-error').css('display', 'block');
                        usernameInput.css('border', '1px solid red');
                        usernameInput.removeClass('border-bottom');
                        passwordInput.css('border', '1px solid red');
                        passwordInput.removeClass('border-bottom');
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert("Failed to update user: " + errorThrown);
                }
            });

        }
    });
});

/* FCT Set temps d'expiration sur cookie
/!\ Cette fonction est en double car on ne peut pas include le fichier cookie.js dans la page de connexion (-> Entraine un bug de refresh de page infini) */
function setExpTime(minuts, day) {
    var date = new Date();
    var time = date.getTime();
    date.setTime(time + 1000 * 60 * minuts + 1000 * 60 * 60 * 24 * day);
    var expires = ";expires="+ date.toUTCString();
    return (expires);
}

/*
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('../service-worker.js')
        .then(function() { console.log('Service Worker Registered');
        })
}*/
