
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
        $.ajax({
            type: "POST",
            url: "http://109.255.19.77:80/FIRE/API/connect.php",
            data: JSON.stringify({user_name: $("#username").val(), password: $("#password").val()}),
            dataType: "JSON",
            success: function (response) {
                deadTime = setExpTime();
                document.cookie = "UserTmp" + "=" + JSON.stringify(response) +  deadTime + ";path=/";
                window.location.href = 'dashboard.html';
            },
        });
    });
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('../service-worker.js')
        .then(function() { console.log('Service Worker Registered');
        })
}
