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

