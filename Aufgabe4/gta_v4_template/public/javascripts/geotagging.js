// File origin: VS1LAB A2



//var GeoTag = require("../../models/geotag.js");
//import {GeoTag} from "../../models/geotag"
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
    var update = function(location) {
        //Tagging
        document.getElementById("lat").value = location.latitude;
        document.getElementById("long").value = location.longitude;
        //Discovery
        document.getElementById("hiddenlat").value = location.latitude;
        document.getElementById("hiddenlong").value = location.longitude;

        const taglist = JSON.parse(document.getElementById("mapView").dataset.tags); //Had to slightly modify getMapUrl as it expects a different Object structure for the tags
        taglist.forEach(element => {console.log(element);
            
        });
        var map=mapManager.getMapUrl(location.latitude, location.longitude, taglist, 12);
        document.getElementById("mapView").src=map;
    }

    if (document.getElementById("hiddenlat").value && document.getElementById("hiddenlong").value) { //Already got a location from the Server
        update({latitude: document.getElementById("hiddenlat").value, longitude: document.getElementById("hiddenlong").value });
    } else { //Gotta find out where we are
        LocationHelper.findLocation(update);
    }
}

function updateTaglist(taglist){
    var html = "";
    console.log(taglist);
    taglist.forEach(element => { 
        if(element != undefined){
        html += '<li>' + element.name + " ( " +  element.latitude + ","+ element.longitude + ") " + element.hashtag + '</li>'
        }
     });

     document.getElementById("discoveryResults").innerHTML = html;
     updateMap(taglist);
}

function addTagToList(tag){
    document.getElementById("discoveryResults").innerHTML += '<li>' + tag.name + " ( " +  tag.latitude + ","+ tag.longitude + ") " + tag.hashtag + '</li>';

    fetch('/api/geotags',{
        method: "GET",
        headers: {"Content-Type": "application/json"}
        
    })
        .then(res =>res.json())
        .then(data => updateMap(data))
        .catch(error => console.error("Fehler: ", error))
}

function updateMap(taglist){
    var lat = document.getElementById("hiddenlat").value;
    var long = document.getElementById("hiddenlong").value;
    var map=mapManager.getMapUrl(lat, long, taglist, 12);
        document.getElementById("mapView").src=map;
}


// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    updateLocation();
    document.getElementById("tag-form").addEventListener("submit",async function(e){
        e.preventDefault();
        var name = document.getElementById("name").value;
        var lat = document.getElementById("lat").value;
        var long = document.getElementById("long").value;
        var hash = document.getElementById("hashtag").value;
        
        fetch("/api/geotags", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body:   JSON.stringify({   "name": name,
                        "latitude": lat,
                        "longitude": long,
                        "hashtag": hash
        })
            
        })
        .then(response => response.json())
        .then(data => addTagToList(data))
        .then(data => console.log("Erfolg"))
        .catch(error => console.error("Fehler: ", error));
    })
    document.getElementById("discoveryFilterForm").addEventListener("submit",async function(e){
        e.preventDefault();

        var params = "?";
        if(document.getElementById("search").value != null){
            params += "searchterm=" + encodeURIComponent(document.getElementById("search").value);

            if(document.getElementById("hiddenlat").value != null && document.getElementById("hiddenlong" != null)){
                params +=  "&latitude=" + document.getElementById("hiddenlat").value + "&longitude=" + document.getElementById("hiddenlong").value;
            }
        }
        else if(document.getElementById("hiddenlat").value != null && document.getElementById("hiddenlong" != null)){
            params += "latitude=" + document.getElementById("hiddenlat").value  + "&longitude=" + document.getElementById("hiddenlong").value;
        }

        fetch('/api/geotags'+ params,{
            method: "GET",
            headers: {"Content-Type": "application/json"}
            
        })
            .then(res =>res.json())
            .then(data => updateTaglist(data))
            .catch(error => console.error("Fehler: ", error))
    })

});

