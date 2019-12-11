function initButtonCreateTruck(id, bc) {
    $('#submit').click(function () {
        let plaque = $('#plaque').val();
        createCamion(plaque, id, bc)

        //createTruck(id, bc);
    });
}

function createCamion(immatriculation,id , bc) {
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
            createTruck(id, bc);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("textStatus : " + textStatus + ", errorThrown : " + errorThrown);
            alert("An error happened");
        }
    });
}

function createTruck(id, bc) {
    bc.load('managebarrack.html', function () {
        initBarrack(id, bc);
    });
}
