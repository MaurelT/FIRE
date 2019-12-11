var barrackId = null;

function initButtonCreateTeam(id, bc) {
    barrackId = id;
    $('#submit').click(function () {

        console.log("Caserne id = " + id);
        console.log("Userlist = ");
        console.log(userList);
        //createTeam(id, bc);
    });
    getAllUsers();
}

var userList = [];

function getAllUsers() {
    let userTmp = JSON.parse(GetCookie("UserTmp"));
    let token = userTmp['token'];

    $.ajax({
        type: "GET",
        url: ApiUrl + "User/user.php",
        headers: {'Authorization': token},
        dataType:"JSON",
        success: function(response) {
            fillUserList(response['Users']);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("textStatus : " + textStatus + ", errorThrown : " + errorThrown);
        }
    });
}

function fillUserList(userList) {
    var cnt = 0;
    var append = "";

    while (cnt < userList.length) {
        append += "<div name='userAdd' id='"+ userList[cnt].id +"' class='col p-0'>";
        append += "<ul class='m-0 facet-list ui-sortable'>";
        append += '<li class="facet">';
        append += '<img class="panel-icon m-2" src="Images/Icons/pompier.png">'+ userList[cnt].user_name;
        append += "</li>";
        append += "</ul>";
        append += "</div>";
        cnt += 1;
    }
    $('#user_container').append(append);
    initUserAdd();
    initUserDel();
}

function initUserAdd() {
    $('[name ="userAdd"]').click(function () {
        var id = this.id;
        userList['"'+id+'"'] = id;
        console.log("User selected");
        addToSelected(this, id);
    });
}

function initUserDel() {
    $('[name ="userDel"]').click(function () {
        var id = this.id;
        delete userList['"'+id+'"'];
        console.log("User deleted");
        removeFromSelected(this, id);
    });
}

function addToSelected(div, id) {
    $('#user_team_container').append(div);
    $('#'+ id).attr('name', 'userDel');
    initUserDel();
}

function removeFromSelected(div, id) {
    $('#user_container').append(div);
    $('#'+ id).attr('name', 'userAdd');
    initUserAdd();
}

function createTeam(id, bc) {
    bc.load('managebarrack.html', function () {
        initBarrack(id, bc);
    });
}
