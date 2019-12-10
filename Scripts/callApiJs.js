// INIT GLOBAL VARIABLES HERE
var ApiUrl = "https://www.theia-project-api.fr/";




//Code starts here..
$(document).ready(function () {
    //createCaserne("Caserne de marseille fada");
    //updateCaserne("Tyé fou le sang", 11);
    //createCamion("105-DD-203");
    //updateCamion("BOUBOU LE S", 11);
});

function createCamion(immatriculation) {
    let userTmp = JSON.parse(GetCookie("UserTmp"));
    let token = userTmp['token'];
    let newTruck = { immatriculation:immatriculation };

    $.ajax({
        type: "POST",
        url: ApiUrl + "Camion/create.php",
        headers: {'Authorization': token},
        data: JSON.stringify(newTruck),
        dataType:"JSON",
        success: function(response) {
            console.log(response);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("textStatus : " + textStatus + ", errorThrown : " + errorThrown);
            alert("An error happened");
        }
    });
}

function updateCamion(immatriculation, id) {
    let userTmp = JSON.parse(GetCookie("UserTmp"));
    let token = userTmp['token'];
    let newTruck = { immatriculation:immatriculation, id:id };

    $.ajax({
        type: "PUT",
        url: ApiUrl + "Camion/update.php?id="+ id +"&immatriculation=" + immatriculation,
        headers: {'Authorization': token},
        data: JSON.stringify(newTruck),
        dataType:"JSON",
        success: function(response) {
            console.log(response);
            getCamion(id);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("textStatus : " + textStatus + ", errorThrown : " + errorThrown);
            alert("An error happened");
        }
    });
}

function getCamion(id) {
    let userTmp = JSON.parse(GetCookie("UserTmp"));
    let token = userTmp['token'];

    let url = ApiUrl + "Camion/camion.php";

    if (id !== undefined) {
        url = url + "?id=" + id;
    }

    $.ajax({
        type: "GET",
        url: url,
        headers: {'Authorization': token},
        dataType:"JSON",
        success: function(response) {
            console.log(response);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("textStatus : " + textStatus + ", errorThrown : " + errorThrown);
            alert("An error happened");
        }
    });
}

function createCaserne(name) {
    let userTmp = JSON.parse(GetCookie("UserTmp"));
    let token = userTmp['token'];
    let newCaserne = { name:name };

    $.ajax({
        type: "POST",
        url: ApiUrl + "Caserne/create.php",
        headers: {'Authorization': token},
        data: JSON.stringify(newCaserne),
        dataType:"JSON",
        success: function(response) {
            console.log(response);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("textStatus : " + textStatus + ", errorThrown : " + errorThrown);
            alert("An error happened");
        }
    });
}

function updateCaserne(name, id) {
    let userTmp = JSON.parse(GetCookie("UserTmp"));
    let token = userTmp['token'];
    let newCaserne = { name:name, id:id };

    $.ajax({
        type: "PUT",
        url: ApiUrl + "Caserne/update.php?id="+ id +"&name=" + name,
        headers: {'Authorization': token},
        data: JSON.stringify(newCaserne),
        dataType:"JSON",
        success: function(response) {
            console.log(response);
            getCaserne();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("textStatus : " + textStatus + ", errorThrown : " + errorThrown);
            alert("An error happened");
        }
    });
}

function getCaserne() {
    let userTmp = JSON.parse(GetCookie("UserTmp"));
    let token = userTmp['token'];

    $.ajax({
        type: "GET",
        url: ApiUrl + "Caserne/caserne.php",
        headers: {'Authorization': token},
        dataType:"JSON",
        success: function(response) {
            console.log(response);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("textStatus : " + textStatus + ", errorThrown : " + errorThrown);
            alert("An error happened");
        }
    });
}