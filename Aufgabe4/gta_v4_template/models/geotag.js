// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/** * 
 * A class representing geotags.
 * GeoTag objects should contain at least all fields of the tagging form.
 */
var nextTagId = 0;

class GeoTag {

    constructor(name, lat, long, hashtag) {
        this.id = nextTagId;
        nextTagId++;
        this.latitude = lat;
        this.longitude = long;
        this.name = name;
        this.hashtag = hashtag;
    }

}

module.exports = GeoTag;
