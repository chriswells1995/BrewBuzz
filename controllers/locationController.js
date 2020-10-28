// Dependencies
// =============================================================
const express = require('express')
const router = express.Router();
const db = require("../models");

// Routes
// =============================================================
router.get(`/api/nearby`, function (req, res) {
    //let minLat = (parseInt(req.body.userLat) -.3);
    //console.log('req full :',req)
    console.log('get request lat :', req.query);
    //console.log('minlat : ',minLat)
    let intLat = parseFloat(req.query.userLat)
    console.log('intlat ' , intLat)
    let maxLat = (intLat + .2);
    let minLat = (intLat - .2);
    let intLon = parseFloat(req.query.userLon)
    console.log('intLon ' , intLon)
    let maxLon = (intLon + .2);
    let minLon = (intLon - .2);
    console.log(`user lat ${req.query.userLat}  maxLat ${maxLat}  minLat ${minLat} user Lon ${req.query.userLon}  maxLon ${maxLon}  minLon ${minLon}`)
    let lon = req.body.userLon
    console.log("route lat :", req.query.userLat)
    console.log("route lon : ", req.query.userLon)
     db.sequelize.query(`select * FROM breweries WHERE (latitude > ${minLat} AND latitude < ${maxLat}) AND (longitude > ${minLon} AND longitude < ${maxLon})`,{raw: true, type: db.sequelize.QueryTypes.SELECT})
     .then(function(results){ 
        console.log('sql results', results) 
        res.json(results)})
        .catch(error => res.json(error))
    })


module.exports = router;


