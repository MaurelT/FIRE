function createInter(bc) {


    $('#submit').click(function () {
        var type = $('#type').val();
        var information = $('#information').val();
        var numero = $('#numero').val();
        var adresse = $('#adresse').val();
        var team_id = $('#teamSelected').val();

        let userTmp = JSON.parse(GetCookie("UserTmp"));
        let token = userTmp['token'];

        console.log(ApiUrl + "Intervention/create.php?team_id="+team_id+"&type='"+type+"'&information='"+information+"'&numero='"+numero+"'&adresse='"+adresse+"'");

        let newInter = { id_equipe:team_id, type:type, information:information, numero:numero, adresse:adresse };


        if (team_id !== "") {
            $.ajax({
                type: "POST",
                url: ApiUrl + "Intervention/create.php?id_equipe="+team_id+"&type="+type+"&information="+information+"&numero="+numero+"&adresse="+adresse,
                headers: {'Authorization': token},
                dataType: "JSON",
                success: function (response) {
                    console.log("Intervention created");
                    console.log(response);
                    bc.load('inprogress.html', function () {
                        initInProgressIntervention();
                    });
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

    getTeams();
}

function getTeams() {
    let userTmp = JSON.parse(GetCookie("UserTmp"));
    let token = userTmp['token'];

    let url = ApiUrl + "Equipe/equipe.php";

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
    console.log(team);
    var cnt = 0;
    var append = "";
    var i = 0;
    var tmp_team;
    var team_list = null;

    console.log(team);
    console.log(teamList);

    console.log(teamList.length);

    while (cnt < teamList.length) {
        console.log("cnt = " + cnt + " teamlist = " + teamList.length);
        tmp_team = teamList[cnt];
        i = 0;
        team_list = "";
        while (i < tmp_team.length) {

            team_list += tmp_team[i].user_name;
            if (i + 1 < tmp_team.length) {
                team_list += ", "
            }
            i += 1;
        }
        append += "<div class='col p-0'>";
        append += "<ul class='m-0 facet-list ui-sortable'>";
        append += '<li class="facet">';
        append += '<img name="chooseEquipe" id="'+ team[cnt]['id'] +'" class="panel-icon m-2" src="Images/firefighter.png">Equipe '+ team[cnt]['id'] +' : '+ team_list;
        append += "</li>";
        append += "</ul>";
        append += "</div>";
        cnt += 1;
    }
    $("#team_container").append(append);
    initTeamSelection();
}

function initTeamSelection() {
    console.log("WTF");
    $('[name ="chooseEquipe"]').click(function () {
        console.log("team number " + this.id);
        $('#teamSelected').val(this.id);
    });
}


