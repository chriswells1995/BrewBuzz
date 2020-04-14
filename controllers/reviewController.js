const express = require('express');
const router = express.Router();
const db = require('../models');



// get all reviews. Useful for testing
router.get('/api/reviews', (req, res) => {
    db.Review.findAll({
  
      //   TODO: double check if user and brewery can be on the same line or not
      include: [db.User, db.Brewery]
    })
    .then(results => res.json(results))
    .catch(error => {
      console.log(error)
      res.status(500).json(error)
    })
  });



// get all of the reviews a specific user made
router.get('/api/reviews/:UserID', (req, res) => {
  db.Review.findAll({

    where: {
        UserID: req.params.UserID
    },
    //   TODO: double check if user and brewery can be on the same line or not
    include: [db.User, db.Brewery]
  })
  .then(results => res.json(results))
  .catch(error => {
    console.log(error)
    res.status(500).json(error)
  })
});

// get all of the reviews for a specific brewery
router.get('/api/reviews/:BreweryID', (req, res) => {
    db.Review.findAll({
  
      where: {
          BreweryID: req.params.BreweryID
      },
      //   TODO: double check if user and brewery can be on the same line or not
      include: [db.User, db.Brewery]
    })
    .then(results => res.json(results))
    .catch(error => {
      console.log(error)
      res.status(500).json(error)
    })
  });



// I believe this will create a new review WITH a specific User ID and Brewery ID
router.post('/api/review', (req, res) => {
  /**
   req.body = {
     note: 'Great Book!'
     BookId: 1
   }
   */
  // INSERT INTO `Notes` (`id`,`review`, `UserID, BreweryID`) VALUES (DEFAULT,?,?,?,?);
  db.Review.create(req.body)
  .then((results) => res.status(200).json(results))
  .catch(error => res.status(500).json(error))
});

// router.delete('/api/review/:id', (req, res) => {
//   db.Review.destroy({
//     where: {
//       id: req.params.id
//     }
//   })
//   .then((results) => res.status(200).json(results))
//   .catch(error => res.status(500).json(error))
// });

module.exports = router;