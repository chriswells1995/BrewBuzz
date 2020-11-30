const express = require("express");
const router = express.Router();
const db = require("../models");

// get all reviews. Useful for testing
router.get("/api/reviews", (req, res) => {
  db.Review.findAll({
    include: [db.User, db.Brewery],
  })
    .then((results) => res.json(results))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

// get all of the reviews a specific user made
router.get("/api/user/reviews/:UserId", (req, res) => {
  db.Review.findAll({
    where: {
      UserId: req.params.UserId,
    },
    include: [db.User, db.Brewery],
  })
    .then((results) => res.json(results))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

// TODO: This has been tested through Postman and works. Just need to wire it up to an update screen
// update a specific review a specific user made
router.put("/api/reviews/:id", (req, res) => {
  var values = { review: req.body.review, rating: req.body.rating };
  var conditions = { where: { id: req.params.id } };
  options = { multi: true };

  db.Review.update(values, conditions, options)
    .then((results) => res.json(results))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

// delete a specific review a specific user made
router.delete("/api/reviews/:id", (req, res) => {
  db.Review.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((results) => res.json(results))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

// get all of the reviews for a specific brewery
router.get("/api/brewery/reviews/:BreweryId", (req, res) => {
  db.Review.findAll({
    where: {
      BreweryId: req.params.BreweryId,
    },
    include: [db.User, db.Brewery],
  })
    .then((results) => res.json(results))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

// This creates a new review with a specific User ID and Brewery ID
router.post("/api/review", (req, res) => {
  // INSERT INTO `Notes` (`id`,`review`, `UserID, BreweryID`) VALUES (DEFAULT,?,?,?,?);
  db.Review.create(req.body)
    .then((results) => res.status(200).json(results))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
