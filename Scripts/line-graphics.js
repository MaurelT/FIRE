

var nb_val_displayed = 5;

var last_nb_called = 5;

var updateCaptors = null;

var lineChart = null;

var type = "Altitude";

var ApiUrl = "https://www.theia-project-api.fr/";

$(document).ready(function() {

    var canvas = document.querySelector('canvas');

    fitToContainer(canvas);

    initButtonHandler();

    var second = 1000;
    updateCaptors = setInterval(callApi, second * 5);

    $(document).on('change','#select_nb_displayed',function(){
        nb_val_displayed = $('#select_nb_displayed').val();
        firstCallApi();

    });

    firstCallApi();
});

function resetAllClasses() {
    $("#humidity").removeClass("btn-img-down");
    $("#humidity").addClass("btn-img");

    $("#wind").removeClass("btn-img-down");
    $("#wind").addClass("btn-img");

    $("#barometer").removeClass("btn-img-down");
    $("#barometer").addClass("btn-img");

    $("#temperature").removeClass("btn-img-down");
    $("#temperature").addClass("btn-img");

    $("#height").removeClass("btn-img-down");
    $("#height").addClass("btn-img");
}

function setClasseClicked(e) {
    $(e).removeClass("btn-img");
    $(e).addClass("btn-img-down");
}

function initButtonHandler() {

    setClasseClicked($("#height"));

    $("#wind").click(function() {
        resetAllClasses();
        setClasseClicked(this);
        type = "Wind";
        firstCallApi();
    });

    $("#humidity").click(function () {
        resetAllClasses();
        setClasseClicked(this);
        type = "Humidity";
        firstCallApi();
    });

    $("#barometer").click(function () {
        resetAllClasses();
        setClasseClicked(this);
        type = "Pression";
        firstCallApi();
    });

    $("#temperature").click(function () {
        resetAllClasses();
        setClasseClicked(this);
        type = "Temperature";
        firstCallApi();
    });

    $("#height").click(function () {
        resetAllClasses();
        setClasseClicked(this);
        type = "Altitude";
        firstCallApi();
    });
}

/* Fonction qui permet au Graphique d'être responsive par rapport aux dimensions de son conteneur */
function fitToContainer(canvas){
  canvas.style.width='100%';
  canvas.style.height='100%';
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

/* Fct qui permet de récupérer que les valeur d'un capteur spécifique (Vent, tempéture, ...) */
function dataManager(data) {
    var dataArray = [];
    var cnt = 0;
    var fastCnt = 0;

    console.log("DATA MANAGER :");
    console.log(data);

    while (cnt < nb_val_displayed && fastCnt < data.length) {
        if (type == data[fastCnt]['name']) {
            dataArray[cnt] = data[fastCnt];
            cnt += 1;
        }
        fastCnt += 1;
    }


    console.log(dataArray);

    createLineChart(dataArray);
}

/* Fct call API Pour récupérer les infos des capteurs /!\ Permet de récupérer les N dernières valeurs d'un capteur*/
function firstCallApi() {
    last_nb_called = nb_val_displayed;

    let userTmp = JSON.parse(GetCookie("UserTmp"));
    let embeddedId = JSON.parse(GetCookie("EmbeddedId"));
    let token = userTmp['token'];

    console.log(ApiUrl + "Sensor/sensor.php?embedded_id="+embeddedId+"&quantity="+ last_nb_called);
    console.log(token);

    $.ajax({
        type: "GET",
        url: ApiUrl + "Sensor/sensor.php?embedded_id="+embeddedId+"&quantity="+ last_nb_called,
        headers: {'Authorization': token},
        success: function(response) {
            console.log("response =");
            console.log(response);
            dataManager(response['Sensors']);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

/* Fct call API Pour récupérer la dernière valeur des capteurs d'un embedded */
function callApi() {

    if (last_nb_called === nb_val_displayed) {

        let userTmp = JSON.parse(GetCookie("UserTmp"));
        let embeddedId = JSON.parse(GetCookie("EmbeddedId"));
        let token = userTmp['token'];

        console.log(ApiUrl + "Sensor/sensor.php?embedded_id="+embeddedId+"&quantity="+ 1);
        console.log(token);

        $.ajax({
            type: "GET",
            url: ApiUrl + "Sensor/sensor.php?embedded_id="+embeddedId+"&quantity=1",
            headers: {'Authorization': token},
            success: function(response) {
                addNewData(response['Sensors']);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                //console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }
    else {
        firstCallApi();
    }
}

/* Fct qui supprime la première valeur du graphique et rajoute la dernière valeur (permet de rendre le graphique dynamique */
function addNewData(sensors) {
    console.log(sensors);
    var cnt = 0;
    while (cnt < sensors.length) {
        if (type == sensors[cnt]['name']) {
            removeFirstData(lineChart);
            addData(lineChart, null, sensors[cnt]['value']);
            cnt = sensors.length;
        }
        cnt += 1;
    }
}

/* Fct qui permet d'ajouter du texte dans l'axe des abscisses (dans le cas présent 1,2,3 ...) */
function getLabel() {
    var label = [];
    var cnt = 0;

    while (cnt < nb_val_displayed) {
        label[cnt] = cnt + 1;
        cnt += 1;
    }
    return (label);
}

/* Fct qui récupère les valeurs de l'api et qui créé un nouveau tableau dans le bon format pour créer le graphique */
function parseData(dataArray) {
    var newArray = [];
    var cnt = 0;
    var n = dataArray.length - 1;

    while (cnt < dataArray.length) {
        newArray[cnt] = dataArray[n]['value'];
        cnt += 1;
        n -= 1;
    }
    return (newArray);
}

/* Fct de création du graphique */
function createLineChart(dataArray) {
    var ctx = document.getElementById("myChart").getContext("2d");

    var dotImage = new Image();
    dotImage.src ='Images/graphic/cross.png';
    dotImage.height = 16;
    dotImage.width = 16;

    var label = getLabel();

    console.log("createLineChart");
    console.log(dataArray);

    dataArray = parseData(dataArray);

    var data = {
        labels: label,
        datasets: [
            {
                backgroundColor: "rgba(220,220,220, 0)",
                borderColor: "#82373b",
                pointBackgroundColor : "#fff",
                //pointStyle : "cross",
                pointStyle : dotImage,
                pointRadius: 10,
                data: dataArray
            }
        ]
    };


    var options = {
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.yLabel;
                    }
                }
            },
        scales: {
            xAxes: [{
                gridLines: {
                    display: true,
                    borderDash: [4, 4],
                    color: "#AAA"
                },
                ticks: {
                    fontColor: "#fff", // this here
                },
            }],
            yAxes: [{
                display: true,
                gridLines: {
                    display: true,
                    borderDash: [4, 4],
                    color : "#AAA"
                },
                ticks : {
                    fontColor: "#fff"
                }
            }],
        }
        };


    lineChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
}


/* Fonction pour ajouter une donnée dans le graphique  */
function addData(chart, label, data) {
    //chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

/* Fonction pour supprimer la dernière valeur dans le graphique */
function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

/* Fonction pour supprimer la première valeur dans le graphique */
function removeFirstData(chart) {
    chart.data.datasets.forEach((dataset) => {
       dataset.data.shift();
    });
    chart.update();
}
