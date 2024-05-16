var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        var data = JSON.parse(xmlhttp.responseText);

        var regionConfirmados = {};
        data.forEach(function(region) {
            var totalConfirmados = 0;
            region.confirmed.forEach(function(confirmado) {
                totalConfirmados += parseInt(confirmado.value);
            });
            regionConfirmados[region.region] = totalConfirmados;
        });

        var sortedRegions = Object.keys(regionConfirmados).sort(function(a, b) {
            return regionConfirmados[b] - regionConfirmados[a];
        });

        var top10Regions = sortedRegions.slice(0, 10);
        var ol = document.getElementById("topRegions");
        top10Regions.forEach(function(region) {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(region + ": " + regionConfirmados[region]));
            ol.appendChild(li);
        });
    }
};

xmlhttp.open("GET", "data.json", true);
xmlhttp.send();
