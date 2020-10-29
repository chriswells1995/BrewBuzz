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
    let floatLat = parseFloat(req.query.userLat)
    
    let maxLat = (floatLat + .2);
    let minLat = (floatLat - .2);
    let floatLon = parseFloat(req.query.userLon)
    console.log('floatLon ' , floatLon)
    let maxLon = (floatLon + .2);
    let minLon = (floatLon - .2);
    // console.log(`user lat ${req.query.userLat}  maxLat ${maxLat}  minLat ${minLat} user Lon ${req.query.userLon}  maxLon ${maxLon}  minLon ${minLon}`)
    // console.log("route lat :", req.query.userLat)
    // console.log("route lon : ", req.query.userLon)
     db.sequelize.query(`select id, name, latitude, longitude FROM Breweries WHERE (latitude > ${minLat} AND latitude < ${maxLat}) AND (longitude > ${minLon} AND longitude < ${maxLon})`)
     .then(function(results){ 
        // console.log('sql res', res) ;
        // console.log('results : ', results)
        res.json(results)
        
        })
        .catch(error => res.json(error))
    })


module.exports = router;


