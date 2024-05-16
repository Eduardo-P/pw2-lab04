google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var data = JSON.parse(xmlhttp.responseText);
            
            var arequipaData = data.find(function(region) {
                return region.region === 'Arequipa';
            });

            if (arequipaData) {

                var chartData = [['Fecha', 'Confirmados']];
                arequipaData.confirmed.forEach(function(dataPoint) {
                    chartData.push([dataPoint.date, parseInt(dataPoint.value)]);
                });

                var data = google.visualization.arrayToDataTable(chartData);

                var options = {
                    title: 'Gráfico de Confirmados para Arequipa',
                    curveType: 'function',
                    legend: { position: 'bottom' }
                };

                var chart = new google.visualization.LineChart(document.getElementById('graphic'));
                chart.draw(data, options);
            } else {
                console.error('No se encontraron datos para la región de Arequipa.');
            }
        }
    };

    xmlhttp.open("GET", "data.json", true);
    xmlhttp.send();
}

