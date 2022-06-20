// File origin: VS1LAB A3

const GeoTag = require("./geotag");

const GeoTagExamples = require("./geotag-examples");

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
class InMemoryGeoTagStore{

    static earthradius = 6_378_137;

    #geotags = [];

    constructor() {
        GeoTagExamples.tagList.forEach(tag => {
            this.addGeoTag(tag[0], tag[1], tag[2], tag[3]);
        });
    }

    addGeoTag(name, latitude, longitude, hashtag) {
        var tag = new GeoTag(name, latitude, longitude, hashtag);
        this.#geotags.push(tag);
        return tag;
    }

    removeGeoTag(tagname) {
        for (let i = 0; i < this.#geotags.length; i++) {
            if(this.#geotags[i].name == tagname) {
                this.#geotags.splice(i);
                return;
                //There should never be multiple tags with the same name
            }
        }
    }

    removeGeoTagById(id) {
        this.#geotags = this.#geotags.filter((tag) => tag.id != id);
    }

    getNearbyGeoTags(latitude, longitude, radius) {
        return this.#geotags.filter((tag) => {
            return this.#distanceOnGlobe(tag.latitude, tag.longitude, latitude, longitude) <= radius;
        });
    }

    searchNearbyGeoTags(searchterm, latitude, longitude, radius) {
        searchterm = searchterm.toLowerCase();
        return this.getNearbyGeoTags(latitude, longitude, radius).filter((tag) => {
            return (tag.name.toLowerCase().includes(searchterm)
             || tag.hashtag.toLowerCase().includes(searchterm));
        });
    }

    searchGeoTags(searchterm) {
        searchterm = searchterm.toLowerCase();
        return this.#geotags.filter((tag) => {
            return (tag.name.toLowerCase().includes(searchterm)
             || tag.hashtag.toLowerCase().includes(searchterm));
        });
    }

    getGeoTagById(id) {
        return this.#geotags.find(tag => tag.id == id);
    }

    get geoTags() {
        return this.#geotags;
    }

    #distanceOnGlobe(lat1, long1, lat2, long2) {
        lat1 = lat1 * Math.PI/180; 
        lat2 = lat2 * Math.PI/180;
        const deltaLat = (lat2-lat1);
        const deltaLong = (long2-long1) * Math.PI/180;

        const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLong/2) * Math.sin(deltaLong/2);

        return InMemoryGeoTagStore.earthradius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    }
}

module.exports = InMemoryGeoTagStore