// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");

const mapManager=new MapManager("f6Izk0LryJDBocqUVZc5AGZ8XGG1yy2c");

/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
function updateLocation() 
{
    update = function(location) {
        //Tagging
        document.getElementById("lat").value = location.latitude;
        document.getElementById("long").value = location.longitude;
        //Discovery
        document.getElementById("hiddenlat").value = location.latitude;
        document.getElementById("hiddenlong").value = location.longitude;

        const taglist = JSON.parse(document.getElementById("mapView").dataset.tags);

        var map=mapManager.getMapUrl(location.latitude, location.longitude, taglist, 12);
        document.getElementById("mapView").src=map;
    }

    if (document.getElementById("hiddenlat").value && document.getElementById("hiddenlong").value) { 
        update({latitude: document.getElementById("hiddenlat").value, longitude: document.getElementById("hiddenlong").value });
    } else { 
        LocationHelper.findLocation(update);
    }
}

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    updateLocation();
});