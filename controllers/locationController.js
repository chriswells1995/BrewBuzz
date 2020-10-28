// Dependencies
// =============================================================
const express = require('express')
const router = express.Router();
const db = require("../models");

// Routes
// =============================================================
router.get(`/api/nearby`, function(req,res){
    console.log("nearby get")
    db.sequelize.query("select * FROM breweries WHERE (latitude > 32.2393 AND latitude < 34.0393) AND (longitude > -87.000 AND longitude < -85.9)",{type: sequelize.QueryTypes.SELECT})
        .then(results => res.json(results))
        // .catch(error => res.json(error))
});


module.exports = router;