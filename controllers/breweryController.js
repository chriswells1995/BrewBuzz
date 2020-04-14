// Dependencies
// =============================================================
const express = require('express')
const router = express.Router();
const Brewery = require("../models/breweryModel.js");

// Routes
// =============================================================

  // Get all breweries
router.get("/api/breweries", function(req, res) {
  // Finding all Breweries, and then returning them to the user as JSON.
  // Sequelize queries are asynchronous, which helps with perceived speed.
  Brewery.findAll({})
  .then(results => res.json(results))
  .catch(err => res.status(500).json(err))
});

router.get("/api/brewery/:id", function(req, res) {
    // Finding all Breweries, and then returning them to the user as JSON.
    // Sequelize queries are asynchronous, which helps with perceived speed.
    Brewery.findAll({
        where: {
            id: req.params.id
        }
    })
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err))
  });

// Add a Brewery
router.post("/api/brewery", function(req, res) {
  // reference the brewery model and then utilize the sequelize.create
  // built in method to create a new brewery
  // inside .create() we reference the author and body columns we feed
  // those columns values from req.body
  Brewery.create({
    // adding req.body(response) to name, website, streetAddress
    name: req.body.name,
    website: req.body.website,
    streetAddress: req.body.streetAddress
  }).then(() => res.json(true))
    .catch((err) => res.status(500).json(err))
});


module.exports = router;