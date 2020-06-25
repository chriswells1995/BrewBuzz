// Dependencies
// =============================================================
const express = require('express')
const router = express.Router();
const db = require("../models");

// Routes
// =============================================================

  // Get all breweries
router.get("/api/breweries", function(req, res) {
  // Finding all Breweries, and then returning them to the user as JSON.
  // Sequelize queries are asynchronous, which helps with perceived speed.
  db.Brewery.findAll({})
  .then(results => res.json(results))
  .catch(err => res.status(500).json(err))
});

// Get one brewery
router.get("/api/brewery/:id", function(req, res) {
    // Finding all Breweries, and then returning them to the user as JSON.
    // Sequelize queries are asynchronous, which helps with perceived speed.
    db.Brewery.findAll({
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
  db.Brewery.create({
    // adding req.body(response) to name, website, streetAddress
    name: req.body.name,
    website: req.body.website,
    streetAddress: req.body.streetAddress
  }).then(() => res.json(true))
    .catch((err) => res.status(500).json(err))
});

// router.put("/api/brewery", function(req, res){
//   db.Brewery.update(
//     {
//       where: {
//        id: req.body.id
//       }
//     }
//   )
//   .then(function(dbPost) {
//     res.json(dbPost);
//   });
// });

// const newData = {
//   name: 'Maxy-boi-boi'
// };



router.put("/api/breweries", function(req, res){
db.Brewery.update( {logo: req.body.logo }, {where: { id: req.body.id } })
.then(updatedBrewery => {
  res.json(updatedBrewery)
})
});

router.put("/api/breweries/rating", function(req, res){
  db.Brewery.update( {totalRating: req.body.totalRating}, {where: { id: req.body.id } })
  .then(updatedBrewery => {
    res.json(updatedBrewery)
  })
  });
// const newData = {
//   name: 'Maxy-boi-boi'
// };




// function updateTodo(todo) {
//   $.ajax({
//     method: "PUT",
//     url: "/api/todos",
//     data: todo
//   }).then(getTodos);
// }



module.exports = router;