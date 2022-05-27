// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

 const GeoTag = require("./geotag");

 const GeoTagExamples = require("./geotag-examples");

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
class InMemoryGeoTagStore
{

    // TODO: ... your code here ...
    geotags = Array();

    constructor()
    {
        GeoTagExamples.tagList.forEach(element => {
            this.addGeoTag(element[0],element[1],element[2],element[3])
        })
    }
    addGeoTag(name, latitude, longitude, hashtag)
    {
        this.geotags.push(new GeoTag(name, latitude, longitude, hashtag));
    }

    removeGeoTag(name)
    {
        for (let i = 0; i < this.geotags.length; i++) 
        {
            if(this.geotags[i].name == name)
            {
                this.geotags.splice(i);
            }
        }
    }

    getNearbyGeoTags(latitude, longitude, radius)
    {
        this.geotags.filter((element) => {
            return this.getDistance(latitude, longitude, element.latitude, element.longitude) <= radius;
        });
    }

    searchNearbyGeoTags(searchterm, latitude, longitude, radius) 
    {
        searchterm = searchterm.toLowerCase();
        return this.getNearbyGeoTags(latitude, longitude, radius).filter((tag) => {
            return (tag.name.toLowerCase().includes(searchterm)
             || tag.hashtag.toLowerCase().includes(searchterm));
        });
    }

    getDistance(latitude1, longitude1, latitude2, longitude2)
    {
        var latDiff = latitude2 - latitude1;
        var longDiff = longitude2 - longitude1;

        return Math.sqrt((latDiff * latDiff) + (longDiff * longDiff));
    }

}

module.exports = InMemoryGeoTagStore
