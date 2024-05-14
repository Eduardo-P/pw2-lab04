var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        var data = JSON.parse(xmlhttp.responseText);
        
        var regionList = document.getElementById("regionList");
        data.forEach(function(region) {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(region.region));
            regionList.appendChild(li);
        });
    }
};

xmlhttp.open("GET", "data.json", true);
xmlhttp.send();