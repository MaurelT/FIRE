
/*
window.onload = function heightWindow() {
  $("#core").css("height", $(window).height() + "px" );
};*/

function setExpTime() {
    var date = new Date();
    var time = date.getTime();
    var expTime = 15;
    date.setTime(time + 1000 * 60 * expTime);
    var expires = ";expires="+ date.toUTCString();
    return (expires);
}

$(document).ready(function() {


    $("#connexion").click(function (e) {
        e.preventDefault();

        var error = 0;

        let userName = $('#username').val();
        let password = $('#password').val();

        if (userName == '') {
            $('#username').css('border', '1px solid red');
            $('#username').removeClass('border-bottom');
            $('#username-error').css('display', 'inline-block');
            error += 1
        }
        if (password == '') {
            $('#password').css('border', '1px solid red');
            $('#password').removeClass('border-bottom');
            $('#password-error').css('display', 'inline-block');
            error += 1
        }

        if (error == 0) {
            $.ajax({
                type: "POST",
                url: "https://www.theia-project-api.fr/connect.php",
                data: JSON.stringify({user_name: $("#username").val(), password: $("#password").val()}),
                dataType: "JSON",
                success: function (response) {
                    deadTime = setExpTime();
                    document.cookie = "UserTmp" + "=" + JSON.stringify(response) +  deadTime + ";path=/";
                    window.location.href = 'dashboard.html';
                },
            });

        }
    });
});

/*
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('../service-worker.js')
        .then(function() { console.log('Service Worker Registered');
        })
} */
