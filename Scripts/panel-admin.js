/*var swapcontent = $("#swapcontent");

swapcontent.click(function() {
    var id = $(this).attr("id");
    $("#pages div").css("display", "none");
    $("#pages div#" + id + "").css("display", "block");
});*/

window.onload = function Init() {
    initTabOne();
    initTabTwo();
};

var userTableListPage = 0;

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

/* TAB ONE FUNCTIONS */

function initTabOne() {
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
                url: "http://109.255.19.77:81/API/User/create.php",
                headers: {'Authorization': token},
                data: JSON.stringify(newUser),
                dataType:"JSON",
                success: function(response) {
                    alert("user created");
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert("some error");
                }
            })
        }
    })
}

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

/* ONGLET 2 FUNCTIONS */

var userList = null;

function initTabTwo() {

    callTable();

    $("#back").click(function () {
        if (userTableListPage > 0) {
            userTableListPage -= 1;
            fillTable();
        }
    });

    $('#next').click(function () {
        if ((userTableListPage + 1) * 10 < userList.length) {
            userTableListPage += 1;
            fillTable();
        }
    });

    $("#button1").click(function(){
        var value = $("#button1").val();
        openModal(value);
    });
    $("#button2").click(function(){
        var value = $("#button2").val();
        openModal(value);
    });
    $("#button3").click(function(){
        var value = $("#button3").val();
        openModal(value);
    });
    $("#button4").click(function(){
        var value = $("#button4").val();
        openModal(value);
    });
    $("#button5").click(function(){
        var value = $("#button5").val();
        openModal(value);
    });
    $("#button6").click(function(){
        var value = $("#button6").val();
        openModal(value);
    });
    $("#button7").click(function(){
        var value = $("#button7").val();
        openModal(value);
    });
    $("#button8").click(function(){
        var value = $("#button8").val();
        openModal(value);
    });
    $("#button9").click(function(){
        var value = $("#button9").val();
        openModal(value);
    });
    $("#button10").click(function(){
        var value = $("#button10").val();
        openModal(value);
    });

    $("#modal-save").click(function (){
        updateUser();
    })
}

function updateUser() {
    let userName = $("#modal-userName").val();
    let prenom = $("#modal-prenom").val();
    let nom = $("#modal-nom").val();
    let email = $("#modal-email").val();
    let rank = $("#modal-role").val();
    let id = $("#modal-save").val();


    let userTmp = JSON.parse(GetCookie("UserTmp"));
    let token = userTmp['token'];
    let newUser = { id:id, name:nom, first_name: prenom, user_name:userName, email:email, rank:rank };

    console.log("updateUser");

    $.ajax({
        type: "PUT",
        url: "http://109.255.19.77:81/API/User/update",
        headers: {'Authorization': token},
        data: JSON.stringify(newUser),
        dataType:"JSON",
        success: function(response) {
            console.log(response);
            alert("user created");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("some error");
        }
    });
}

function openModal(value) {

    if (value == -1) {
        alert("Vous ne pouvez pas faire cela !");
    }
    else {
        let userTmp = JSON.parse(GetCookie("UserTmp"));
        let token = userTmp['token'];
        let data = { id:value };

        console.log("openModal");

        $.ajax({
            type: "GET",
            url: "http://109.255.19.77:81/API/User/user.php",
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
    if (parsedTabg != null) {
        $("#modal_title").text(parsedTab.name + " " + parsedTab.first_name);
        $("#modal-userName").val(parsedTab.user_name);
        $("#modal-prenom").val(parsedTab.name);
        $("#modal-nom").val(parsedTab.first_name);
        $("#modal-email").val(parsedTab.email);
        $("#modal-save").val(id);
    }

}

function callTable() {
    let userTmp = JSON.parse(GetCookie("UserTmp"));
    let token = userTmp['token'];

    console.log("calltable");

    console.log("token = " + token);
    $.ajax({
        type: "GET",
        url: "http://109.255.19.77:81/API/User/user.php",
        headers: {'Authorization': token},
        dataType:"JSON",
        success: function(response) {
            console.log(response);
            userList = response['Users'];
            fillTable()
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("An error happened");
        }
    });
}

function fillTable() {

    var i = 0;

    while (i < 10) {
        let cnt = userTableListPage * 10 + i;
        if (cnt < userList.length) {
            $("#prenom" + (i + 1)).html(userList[cnt].first_name);
            $("#nom" + (i + 1)).html(userList[cnt].name);
            $("#rank" + (i + 1)).html(userList[cnt].rank);
            $("#email" + (i + 1)).html(userList[cnt].email);
            $("#button" + (i + 1)).val(userList[cnt].id);
        }
        else {
            $("#prenom" + (i + 1)).html('');
            $("#nom" + (i + 1)).html('');
            $("#rank" + (i + 1)).html('');
            $("#email" + (i + 1)).html('');
            $("#button" + (i + 1)).val("-1");
        }
        i += 1;

    }
}
