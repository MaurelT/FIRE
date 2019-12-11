function createInter() {


    $('#submit').click(function () {
        var type = $('#type').val();
        var information = $('#information').val();
        var numero = $('#numero').val();
        var adresse = $('#adresse').val();
        var team_id = $('#team_id').val();

        let userTmp = JSON.parse(GetCookie("UserTmp"));
        let token = userTmp['token'];
        let newCaserne = { name:name };

        if (team_id !== "") {
            $.ajax({
                type: "POST",
                url: ApiUrl + "Intervention/intervention.php?team_id="+team_id+"&type="+type+"&information"+information+"&numero="+numero+"&adresse"+adresse,
                headers: {'Authorization': token},
                data: JSON.stringify(newCaserne),
                dataType: "JSON",
                success: function (response) {
                    console.log("Intervention created");
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log("textStatus : " + textStatus + ", errorThrown : " + errorThrown);
                    alert("An error happened");
                }
            });
        }
    });

    /*
    var test = console.log;
    test("Salut");
    */

    //getTeams();
}

function getTeams() {
    let userTmp = JSON.parse(GetCookie("UserTmp"));
    let token = userTmp['token'];

    let url = ApiUrl + "Equipe/equipe.php?caserne_id=" + barrackId;

    $.ajax({
        type: "GET",
        url: url,
        headers: {'Authorization': token},
        dataType:"JSON",
        success: function(response) {
            getAllUsers(response['Equipe']);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("textStatus : " + textStatus + ", errorThrown : " + errorThrown);
            alert("An error happened");
        }
    });
}

/* Fct Call API Pour récupérer la liste de tous les utilisateurs */
function getAllUsers(team) {
    let userTmp = JSON.parse(GetCookie("UserTmp"));
    let token = userTmp['token'];

    $.ajax({
        type: "GET",
        url: ApiUrl + "User/user.php",
        headers: {'Authorization': token},
        dataType:"JSON",
        success: function(response) {
            getAllTeamUser(team, response['Users']);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("textStatus : " + textStatus + ", errorThrown : " + errorThrown);
        }
    });
}

/* Do not watch this. */
function getAllTeamUser(team, userList) {
    var cnt = 0;
    var teamList = [];
    var userTmp = null;
    var i = 0;
    var n = 0;
    var tmp_team = null;

    while (cnt < team.length) {
        tmp_team = team[cnt]['id_users'];
        i = 0;
        userTmp = [];
        while (i < tmp_team.length) {
            n = 0;
            while (n < userList.length) {
                if (tmp_team[i] === userList[n]['id']) {
                    userTmp.push(userList[n]);
                }
                n += 1;
            }
            i += 1;
        }
        cnt += 1;
        teamList.push(userTmp);
    }
    fillTeam(teamList, team);
}

function fillTeam(teamList,team) {
    var cnt = 0;
    var append = "";
    var i = 0;
    var tmp_team;

    while (cnt < teamList.length) {
        tmp_team = teamList[cnt];
        i = 0;
        //append += "<div class='col p-0'><ul class='m-0 facet-list ui-sortable'>";
        while (i < tmp_team.length) {

            /*
            tmp_team[i] = team member --> tmp_team[i].user_name
            team[cnt] = team --> team[cnt].id


            A MODIFIER
            append += '<li class="facet"><img class="rprofil m-2" src="Images/Icons/pompier.png" id="profil_photo">'
                + tmp_team[i].user_name +
                '<img class="on_off_icon m-2" src="Images/Icons/on.png"><img id="' + tmp_team[i].id + '" name="'+ team[cnt].id +'" class="delTeamMember iconeslist m-2" src="Images/Icons/delete.png"></li>';
             */


            i += 1;
        }
        //append += "</ul></div>";
        cnt += 1;
    }
    $("#").append(append);
}
