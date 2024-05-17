document.addEventListener("DOMContentLoaded", function() {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
});

function drawChart() {
    var datasets = {};
    var dates = [];

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var data = JSON.parse(xmlhttp.responseText);

            data.forEach(regionData => {
                var regionName = regionData.region;
                
                if (regionName !== 'Lima' && regionName !== 'Callao') {
                    var color = '#' + (Math.random().toString(16) + '000000').substring(2,8);

                    if (Array.isArray(regionData['confirmed'])) {
                        var values = regionData['confirmed'].map(entry => parseInt(entry.value));
                        var sectionDates = regionData['confirmed'].map(entry => entry.date);
                        dates = dates.concat(sectionDates);

                        datasets['confirmed'] = datasets['confirmed'] || [];
                        datasets['confirmed'].push({
                            label: regionName,
                            data: values,
                            color: color
                        });
                    }
                }
            });

            dates = [...new Set(dates)];
            
            drawGoogleChart(datasets['confirmed'], dates);
        }
    };
    xmlhttp.open("GET", "data.json", true);
    xmlhttp.send();
}

