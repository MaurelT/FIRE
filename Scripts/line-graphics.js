

var nb_val_displayed = 5;

var last_nb_called = 5;

var updateCaptors = null;

var lineChart = null;

var type = "Altitude";

$(document).ready(function() {

    var second = 1000;
    updateCaptors = setInterval(callApi, second * 5);

    $(document).on('change','#select_nb_displayed',function(){
        var newVal = $('#select_nb_displayed').val();
        nb_val_displayed = newVal;
        alert(newVal);
        firstCallApi();

    });

    $(document).on('change','#type_displayed',function(){
        type = $('#type_displayed').val();
        firstCallApi();
    });

    firstCallApi();

});

function dataManager(data) {
    var dataArray = [];
    var cnt = 0;
    var fastCnt = 0;
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

function firstCallApi() {
    last_nb_called = nb_val_displayed;

    let userTmp = JSON.parse(GetCookie("UserTmp"));
    let embeddedId = JSON.parse(GetCookie("EmbeddedId"));
    let token = userTmp['token'];

    console.log("http://109.255.19.77:81/API/Sensor/sensor.php?embedded_id="+embeddedId+"&quantity="+ last_nb_called);
    console.log(token);

    $.ajax({
        type: "GET",
        url: "http://109.255.19.77:81/API/Sensor/sensor.php?embedded_id="+embeddedId,
        headers: {'Authorization': token},
        success: function(response) {
            dataManager(response['Sensors']);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //console.log(textStatus);
            console.log(errorThrown);
        }
    });
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

function callApi() {

    if (last_nb_called === nb_val_displayed) {

        let userTmp = JSON.parse(GetCookie("UserTmp"));
        let embeddedId = JSON.parse(GetCookie("EmbeddedId"));
        let token = userTmp['token'];

        console.log("http://109.255.19.77:81/API/Sensor/sensor.php?embedded_id="+embeddedId+"&quantity=last");
        console.log(token);

        $.ajax({
            type: "GET",
            url: "http://109.255.19.77:81/API/Sensor/sensor.php?embedded_id="+embeddedId,
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

function getLabel() {
    var label = [];
    var cnt = 0;

    while (cnt < nb_val_displayed) {
        label[cnt] = cnt + 1;
        cnt += 1;
    }
    return (label);
}

function fkingtmpFunction() {
    var tmpArray = [];

    var cnt = 0;

    while (cnt < nb_val_displayed) {
        tmpArray[cnt] = 0;
        cnt += 1;
    }
    return (tmpArray);
}

function createLineChart(dataArray) {
    var ctx = document.getElementById("myChart").getContext("2d");

    var dotImage = new Image();
    dotImage.src ='Images/graphic/cross.png';
    dotImage.height = 16;
    dotImage.width = 16;

    var label = getLabel();

    console.log("createLineChart");
    console.log(dataArray);

    /* TODO Changer data: [2, 3, 5, 7, 11] par data: dataArray une fois que le endpoint est fonctionnel */

    var tmpArray = fkingtmpFunction();

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
                data: tmpArray
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


function addData(chart, label, data) {
    //chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}


function removeFirstData(chart) {
    chart.data.datasets.forEach((dataset) => {
       dataset.data.shift();
    });
    chart.update();
}