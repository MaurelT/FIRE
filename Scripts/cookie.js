var path = "";

var cookie = null;

let second = 1000;
var checkCookie = null;

$(document).ready(function(){

    updateCookie();
    checkCookie = setInterval(updateCookie, second * 5);

    initTutorialManager();

    $('#menu-deconnexion').click(function () {
       eraseCookie('UserTmp');
       eraseCookie('EmbeddedId');
       window.location.href = "index";
    });
});

function initTutorialManager() {

    let tutoSwitch = GetCookie("fire-tuto");

    if (tutoSwitch == null || tutoSwitch === 'true') {
        tutoSwitch = true;
    } else {
        tutoSwitch = false;
    }

    checkTuto(tutoSwitch);

    if (tutoSwitch) {
        $('#tutorial-switch').prop('checked', true);
    } else {
        $('#tutorial-switch').prop('checked', false);
    }

    $('#tutorial-switch').change(function() {

        if ($(this).is(':checked'))
        {
            eraseCookie('fire-tuto');
            setCookie("fire-tuto", true, "59", "365");
            checkTuto(true);
        } else {
            eraseCookie('fire-tuto');
            setCookie("fire-tuto", false, "59", "365");
            checkTuto(false);
        }

    });
}

function checkTuto(tutoSwitch) {
    let infobulle = $(".infobulle");

    if (tutoSwitch) {
        $('.infobulle').css('display', 'block');
    } else {
        console.log("infobulles cachées");
        infobulle.attr('style', 'display:none;');
    }
}


/* FCT MIS A JOUR COOKIE */
function updateCookie() {

    console.log(pathname);
    return ;

    let newCookie = GetCookie("UserTmp");

    if (newCookie != null && cookie == null) {
        cookie = newCookie
    }

    if (newCookie == null && cookie == null) {
        window.location.href = "index";
    }
    else if (newCookie == null && cookie != null) {
        setCookie("UserTmp", cookie, 15, 0);
    }
}


/* FCT Set temps d'expiration sur cookie */
function setExpTime(minuts, day) {
    var date = new Date();
    var time = date.getTime();
    date.setTime(time + 1000 * 60 * minuts + 1000 * 60 * 60 * 24 * day);
    var expires = ";expires="+ date.toUTCString();
    return (expires);
}

/* FCT Ajouter cookie */
function setCookie(name, data, minuts, day) {
    var deadTime = setExpTime(minuts, day);
    document.cookie = name + "=" + data +  deadTime + ";path=/" + path;
}

/* FCT récupérer la valeur d'un cookie */
function getCookieVal(offset) {
    var endstr=document.cookie.indexOf (";", offset);
    if (endstr==-1) endstr=document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
}

/* FCT Récupérer un cookie (objet) */
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

/* FCT Supprimer cookie */
function eraseCookie(name) {
    var date = new Date();
    var time = date.getTime();
    date.setTime(time - 1000 * 60);
    var expires = ";expires="+ date.toUTCString();

    var data = "";

    document.cookie = name + "=" + data +  expires + ";path=/" + path;
    console.log("cookie erased");
}
