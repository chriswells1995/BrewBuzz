// Dependencies
// =============================================================
const express = require('express')
const router = express.Router();
const db = require("../models");

// Routes
// =============================================================
router.get(`/api/nearby1`, function (req, res) {
    console.log("nearby get")
    db.sequelize.query("select * FROM breweries WHERE (latitude > 32.2393 AND latitude < 34.0393) AND (longitude > -87.000 AND longitude < -85.9)",{raw: true, type: db.sequelize.QueryTypes.SELECT})
    .then(results => res.json(results))
        .catch(error => res.json(error))
    })
    // .catch(error => res.json(error))


// sequelize.query('SELECT...').spread((results, metadata) => {
//     // Raw query - use spread
//   });

module.exports = router;