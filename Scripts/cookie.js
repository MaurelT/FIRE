var path = "";

var cookie = null;

let second = 1000;
var checkCookie = null;

$(document).ready(function(){

    updateCookie();
    checkCookie = setInterval(updateCookie, second * 5);

    $('#menu-deconnexion').click(function () {
       eraseCookie('UserTmp');
       eraseCookie('EmbeddedId');
       window.location.href = "index";
    });
});

function updateCookie() {
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

function setExpTime(minuts, day) {
    var date = new Date();
    var time = date.getTime();
    date.setTime(time + 1000 * 60 * minuts + 1000 * 60 * 60 * 24 * day);
    var expires = ";expires="+ date.toUTCString();
    return (expires);
}

function setCookie(name, data, minuts, day) {
    var deadTime = setExpTime(minuts, day);
    document.cookie = name + "=" + data +  deadTime + ";path=/" + path;
}


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

function eraseCookie(name) {
    var date = new Date();
    var time = date.getTime();
    date.setTime(time - 1000 * 60);
    var expires = ";expires="+ date.toUTCString();

    var data = ""

    document.cookie = name + "=" + data +  expires + ";path=/" + path;
    console.log("cookie erased");
}
