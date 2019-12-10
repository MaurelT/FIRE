function initButtonCreateBarrack() {
    $('#submit').click(function () {
        let name = $('#name').val();
        createCaserne(name);
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
            window.location.reload();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("textStatus : " + textStatus + ", errorThrown : " + errorThrown);
            alert("An error happened");
        }
    });
}