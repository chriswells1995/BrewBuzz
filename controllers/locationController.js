// Dependencies
// =============================================================
const express = require('express')
const router = express.Router();
const db = require("../models");

// Routes
// =============================================================
router.get(`/api/nearby`, function (req, res) {
    //let minLat = (parseInt(req.body.userLat) -.3);
    console.log('req full :',req)
    console.log('get request lat :', req.query);
    //console.log('minlat : ',minLat)
    let maxLat = req.body.userLat;
    let lon = req.body.userLon
    console.log("route lat :", req.query.userLat)
    console.log("route lon : ", req.query.userLon)
    // db.sequelize.query(`select * FROM breweries WHERE (latitude > (${minLat}) AND latitude < ${minLat}) AND (longitude > -87.000 AND longitude < -85.9)`,{raw: true, type: db.sequelize.QueryTypes.SELECT})
    // .then(results => res.json(results))
    //     .catch(error => res.json(error))
    })


module.exports = router;