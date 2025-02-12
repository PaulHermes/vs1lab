// File origin: VS1LAB A3

/**
 * This script defines the main router of the GeoTag server.
 * It's a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * Define module dependencies.
 */

const express = require('express');
const router = express.Router();

/**
 * The module "geotag" exports a class GeoTagStore. 
 * It represents geotags.
 * 
 * TODO: implement the module in the file "../models/geotag.js"
 */
// eslint-disable-next-line no-unused-vars
const GeoTag = require('../models/geotag');

/**
 * The module "geotag-store" exports a class GeoTagStore. 
 * It provides an in-memory store for geotag objects.
 * 
 * TODO: implement the module in the file "../models/geotag-store.js"
 */
// eslint-disable-next-line no-unused-vars
const GeoTagStore = require('../models/geotag-store');

//Setup Geo Tags app. Should probably be done elsewhere?
const defaultSearchRadius = 10_000;
const tagStore = new GeoTagStore();

/**
 * Route '/' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests cary no parameters
 *
 * As response, the ejs-template is rendered without geotag objects.
 */

// TODO: extend the following route example if necessary
router.get('/', (req, res) => {
  res.render('index', { taglist: tagStore.geoTags, longitude: "", latitude: "" })
});

/**
 * Route '/tagging' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests cary the fields of the tagging form in the body.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * Based on the form data, a new geotag is created and stored.
 *
 * As response, the ejs-template is rendered with geotag objects.
 * All result objects are located in the proximity of the new geotag.
 * To this end, "GeoTagStore" provides a method to search geotags 
 * by radius around a given location.
 */
 router.post('/tagging', (req, res) => {
  const name = req.body["name"];
  const hashtag = req.body["hashtag"];
  const long = req.body["long"];
  const lat = req.body["lat"];
  const radius = req.body["radius"] != undefined ? req.body["radius"] : defaultSearchRadius;

  tagStore.addGeoTag(name, lat, long, hashtag);

  const tags = tagStore.getNearbyGeoTags(lat, long, radius);
  res.render('index', { taglist: tags, longitude: long, latitude: lat })
 });

/**
 * Route '/discovery' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests cary the fields of the discovery form in the body.
 * This includes coordinates and an optional search term.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * As response, the ejs-template is rendered with geotag objects.
 * All result objects are located in the proximity of the given coordinates.
 * If a search term is given, the results are further filtered to contain 
 * the term as a part of their names or hashtags. 
 * To this end, "GeoTagStore" provides methods to search geotags 
 * by radius and keyword.
 */

router.post('/discovery', (req, res) => {
  const search = req.body["search"];
  const long = req.body["hiddenlong"] != undefined ? req.body["hiddenlong"] : 0;
  const lat = req.body["hiddenlat"] != undefined ? req.body["hiddenlat"] : 0;
  const radius = req.body["radius"] != undefined ? req.body["radius"] : defaultSearchRadius;
  console.log(search);
  const tags = search == undefined ? 
    tagStore.getNearbyGeoTags(lat, long, radius) : 
    tagStore.searchNearbyGeoTags(search, lat, long, radius);
  res.render('index', { taglist: tags, longitude: long, latitude: lat })
});


module.exports = router;
