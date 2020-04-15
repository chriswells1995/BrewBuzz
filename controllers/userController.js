// Dependencies
// =============================================================
const express = require('express')
const router = express.Router();
const db = require("../models");

// Routes
// =============================================================

  // Get all users
router.get("/api/users", function(req, res) {
  // Finding all Breweries, and then returning them to the user as JSON.
  // Sequelize queries are asynchronous, which helps with perceived speed.
  db.User.findAll({})
  .then(results => res.json(results))
  .catch(err => res.status(500).json(err))
});

// Get one user
router.get("/api/user/:id", function(req, res) {
    // Finding all Breweries, and then returning them to the user as JSON.
    // Sequelize queries are asynchronous, which helps with perceived speed.
    db.User.findAll({
        where: {
            id: req.params.id
        }
    })
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err))
  });




module.exports = router;