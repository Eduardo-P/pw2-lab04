document.addEventListener("DOMContentLoaded", function() {
    var select = document.getElementById("select_region");

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var data = JSON.parse(xmlhttp.responseText);
            data.forEach(function(region) {
                var option = document.createElement("option");
                option.value = region.region;
                option.text = region.region;
                select.appendChild(option);
            });
        }
    };
    xmlhttp.open("GET", "data.json", true);
    xmlhttp.send();

    document.getElementById("show_graphic").addEventListener("click", function() {
        drawChart();
    });
});

function drawChart() {
    var selectedRegions = Array.from(document.getElementById("select_region").selectedOptions).map(option => option.value);

    var datasets = {};
    var dates = [];

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var data = JSON.parse(xmlhttp.responseText);

            selectedRegions.forEach(regionName => {
                var regionData = data.find(region => region.region === regionName);
                var color = '#' + (Math.random().toString(16) + '000000').substring(2,8);

                Object.keys(regionData).forEach(section => {
                    if (Array.isArray(regionData[section])) {
                        if (!datasets[section]) {
                            datasets[section] = [];
                        }

                        var values = regionData[section].map(entry => parseInt(entry.value));
                        var sectionDates = regionData[section].map(entry => entry.date);
                        dates = dates.concat(sectionDates);

                        datasets[section].push({
                            label: regionName,
                            data: values,
                            color: color
                        });
                    }
                });
            });

            dates = [...new Set(dates)];

            drawGoogleChart(datasets, dates);
        }
    };
    xmlhttp.open("GET", "data.json", true);
    xmlhttp.send();
}

function drawGoogleChart(datasets, dates) {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(function() {
        var chartsContainer = document.getElementById("graphics");
        chartsContainer.innerHTML = "";

        Object.keys(datasets).forEach(section => {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Date');
            datasets[section].forEach(dataset => {
                data.addColumn('number', dataset.label);
            });

            var rows = [];
            dates.forEach(date => {
                var row = [date];
                datasets[section].forEach(dataset => {
                    var value = dataset.data[dates.indexOf(date)] || 0;
                    row.push(value);
                });
                rows.push(row);
            });
            data.addRows(rows);

            var options = {
                title: section.toUpperCase(),
                curveType: 'function',
                legend: { position: 'bottom' }
            };

            var chart = new google.visualization.LineChart(document.createElement('div'));
            chart.draw(data, options);
            chartsContainer.appendChild(chart.getContainer());
        });
    });
}
