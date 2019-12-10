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
}