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

        var ul = document.getElementById("regionConfirmados");
        for (var region in regionConfirmados) {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(region + ": " + regionConfirmados[region]));
            ul.appendChild(li);
        }
    }
};

xmlhttp.open("GET", "data.json", true);
xmlhttp.send();
