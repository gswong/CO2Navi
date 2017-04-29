$.getJSON("feed.json", function (data) {

    for (var i=0; i<data.length; i++) {

        var node = document.createElement("LI");

        var name = data[i].name;
        var transportation = data[i].transportation;
        var distanceMiles = data[i].distance;
        var co2Saved = data[i].co2Saved;

        var transportationPrefix = "";
        var transportationSuffix = "";
        if (transportation == "bus") {
            transportationPrefix = " took the ";
        } else if (transportation == "car") {
            transportationPrefix = " drove a ";
        } else if (transportation == "walk") {
            transportationPrefix = " ";
            transportationSuffix = "ed ";
        } else if (transportation == "bike") {
            transportationPrefix = " ";
            transportationSuffix = "d ";
        }
        var co2SavedPrefix = " and saved ";
        var co2SavedSuffix = " lbs of CO2!";
        var distancePrefix = " ";
        var distanceSuffix = " miles ";
        var textnode = document.createTextNode(
            name +
            transportationPrefix + transportation + transportationSuffix +
            distancePrefix + distanceMiles + distanceSuffix +
            co2SavedPrefix + co2Saved + co2SavedSuffix
            );
        node.appendChild(textnode);
        node.style="font-size:75%";

        document.getElementById("feed").appendChild(node);

    }

});
