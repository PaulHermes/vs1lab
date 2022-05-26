// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");
const mapManager = new MapManager("GaEQEQOvVMrNHkiTaQw5MiGABlYJZYjg");
/**
 * A class to help using the HTML5 Geolocation API.
 */

/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
// ... your code here ...

function updateLocation() {
    tags=JSON.parse(document.getElementById("mapView").dataset.tags);
    if (document.getElementById("latdis").value == "" && document.getElementById("longdis").value == "") {
        var locationHelper = new LocationHelper();
        LocationHelper.findLocation(function (value) {
            locationHelper = value;
            document.getElementById("lat").value = locationHelper.latitude;
            document.getElementById("long").value = locationHelper.longitude;

            document.getElementById("latdis").value = locationHelper.latitude;
            document.getElementById("longdis").value = locationHelper.longitude;
            console.log(document.getElementById("mapView").dataset.tags+"test");
            

            var newMap = mapManager.getMapUrl(locationHelper.latitude, locationHelper.longitude,tags);
            document.getElementById("mapView").src = newMap;
        });
    } else {
        var newMap = mapManager.getMapUrl(document.getElementById("latdis").value, document.getElementById("longdis").value,tags);
        document.getElementById("mapView").src = newMap;
    }





}
// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    //alert("Please change the script 'geotagging.js'");
    updateLocation();
});