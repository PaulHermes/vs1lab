// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * A class for in-memory-storage of geotags
 * 
 * Use an array to store a multiset of geotags.
 * - The array must not be accessible from outside the store.
 * 
 * Provide a method 'addGeoTag' to add a geotag to the store.
 * 
 * Provide a method 'removeGeoTag' to delete geo-tags from the store by name.
 * 
 * Provide a method 'getNearbyGeoTags' that returns all geotags in the proximity of a location.
 * - The location is given as a parameter.
 * - The proximity is computed by means of a radius around the location.
 * 
 * Provide a method 'searchNearbyGeoTags' that returns all geotags in the proximity of a location that match a keyword.
 * - The proximity constrained is the same as for 'getNearbyGeoTags'.
 * - Keyword matching should include partial matches from name or hashtag fields. 
 */
const GeoTagExamples = require('./geotag-examples');
const GeoTag = require('./geotag');

class InMemoryGeoTagStore {
    #geotags = [];
    // TODO: ... your code here ...
    constructor() {
        GeoTagExamples.tagList.forEach(element => {
            this.addGeoTag(element[0], element[1], element[2], element[3]);
        })
        this.#geotags.forEach(element => { console.log(element); })
    }

    addGeoTag(name, latitude, longitude, hashtag) {
        this.#geotags.push(new GeoTag(name, latitude, longitude, hashtag));
    }
    removeGeoTag(geotagname) {
        geotags.forEach(element => {
            if (element.name == geotagname) {
                this.#geotags.splice(element);
                return;
            }
        });
    }

    getNearbyGeoTags(latitude, longitude, radius) {
        return this.#geotags.filter((element) => { return this.#entfernungBerechnen(latitude, element.latitude, longitude, element.longitude) <= radius; })
    }

    searchNearbyGeoTags(keyword, latitude, longitude, radius) {
        this.getNearbyGeoTags(latitude, longitude, radius).filter((element) => {
            if (element.name == keyword || element.hashtag == keyword) {
                return element;
            }
        })
    }
    #entfernungBerechnen(lat1, lat2, long1, long2) {
        var difLat = lat2 - lat1;
        var difLong = long2 - long1;
        difLat = Math.pow(difLat, 2);
        difLong = Math.pow(difLong, 2);
        var sum = difLong + difLat;

        sum = Math.sqrt(sum);
        
        return sum;
    }
}

module.exports = InMemoryGeoTagStore
