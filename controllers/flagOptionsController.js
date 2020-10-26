// Dependencies
// =============================================================
const express = require('express')
const router = express.Router();
const db = require("../models");

// Routes
// =============================================================

  // Get all options
router.get("/api/flagoptions", function(req, res) {
  // Finding all Breweries, and then returning them to the user as JSON.
  // Sequelize queries are asynchronous, which helps with perceived speed.
  db.FlagOptions.findAll({})
  .then(results => res.json(results))
  .catch(err => res.status(500).json(err))
});



// Add an option
router.post("/api/flagoption", function(req, res) {
  // reference the brewery model and then utilize the sequelize.create
  // built in method to create a new brewery
  // inside .create() we reference the author and body columns we feed
  // those columns values from req.body
  db.FlagOptions.create({
    // adding req.body(response) to name, website, streetAddress
    flagType: req.body.flagType
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



// router.put("/api/breweries", function(req, res){
// db.Brewery.update( {logo: req.body.logo }, {where: { id: req.body.id } })
// .then(updatedBrewery => {
//   res.json(updatedBrewery)
// })
// });

// router.put("/api/breweries/rating", function(req, res){
//   db.Brewery.update( {totalRating: req.body.totalRating}, {where: { id: req.body.id } })
//   .then(updatedBrewery => {
//     res.json(updatedBrewery)
//   })
//   });
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