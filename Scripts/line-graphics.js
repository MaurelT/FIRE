

var nb_val_displayed = 5;

var last_nb_called = 5;

var updateCaptors = null;

var lineChart = null;

$(document).ready(function() {

    var second = 1000;
    updateCaptors = setInterval(callApi, second * 5);

    $(document).on('change','#select_nb_displayed',function(){
        var newVal = $('#select_nb_displayed').val();

        alert(newVal);
        //TODO rajouter firstCallApi()

    });
    
    $('#test').click(function () {
       if (nb_val_displayed === 15) {
           nb_val_displayed = 5
       }
       else
           nb_val_displayed = 15;
       firstCallApi()
    });

    firstCallApi();

});

function dataManager(response) {
    switch (nb_val_displayed) {
        case 5 :
            console.log(5);
            break;

        case 10 :
            console.log(10);
            break;

        case 15 :
            console.log(15);
            break;
        case 20 :
            console.log(20);
            break;

        case 25 :
            console.log(25);
            break;

        default:
            alert("An error happenend : function dataManager line-graphics.js");
    }
}

function firstCallApi() {
    last_nb_called = nb_val_displayed;
    createLineChart();
}

function callApi() {

    if (last_nb_called === nb_val_displayed) {

        //Call pour recevoir la dernière data des capteurs.

        var newData = (Math.random() * 100);
        newData = Math.round(newData) % 11;

        removeFirstData(lineChart);
        addData(lineChart, null, newData);
    }
    else {
        // Call pour recevoir les x dernières data des capteurs (où x = nb_val_displayed)
        /* Réset toutes les datas du graph */
        last_nb_called = nb_val_displayed;
        createLineChart();
    }


}

function createLineChart() {
    var ctx = document.getElementById("myChart").getContext("2d");

    var dotImage = new Image()
    dotImage.src ='http://your.site.com/your_image.png';

    var data = {
        labels: [1, 2, 3, 4, 5],
        datasets: [
            {
                backgroundColor: "rgba(220,220,220, 0)",
                borderColor: "#82373b",
                pointBackgroundColor : "#fff",
                pointStyle : "cross",
                pointRadius: 10,
                data: [2, 3, 5, 7, 11]
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