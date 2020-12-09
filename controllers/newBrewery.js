// Dependencies
// =============================================================
const express = require("express");
const router = express.Router();
const db = require("../models");
const nodemailer = require("nodemailer");
var userId = localStorage.getItem("userId");

// Mail Handling
// =============================================================

// Configuring Nodemailer SMTP credentials
const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Routes
// =============================================================

// Get all options
router.get("/api/newbreweries", function (req, res) {
  // Finding all Breweries, and then returning them to the user as JSON.
  // Sequelize queries are asynchronous, which helps with perceived speed.
  db.NewBreweries.findAll({
    include: [
      db.BreweryName,
      db.BreweryWebsite,
      db.BreweryStreet,
      db.BreweryCity,
      db.BreweryState,
      db.BreweryZip,
      db.BreweryPhone,
    ],
  })
    .then((results) => res.json(results))
    .catch((err) => res.status(500).json(err));
});

// Add an option
router.post("/api/newbrewery", function (req, res) {
  // reference the brewery model and then utilize the sequelize.create
  // built in method to create a new brewery
  // inside .create() we reference the author and body columns we feed
  // those columns values from req.body
  db.NewBreweries.create({
    // adding req.body(response) to name, website, streetAddress
    UserId: userId,
    BreweryName: req.body.BreweryName,
    BreweryWebsite: req.body.BreweryWebsite,
    BreweryStreet: req.body.BreweryStreet,
    BreweryCity: req.body.BreweryCity,
    BreweryState: req.body.BreweryState,
    BreweryZip: req.body.BreweryZip,
    BreweryPhone: req.body.BreweryPhone,
  })
    .then(() => res.json(true))
    .catch((err) => res.status(500).json(err));

  //create email
  const message = {
    from: process.env.SENDER_ADDRESS,
    to: process.env.ADMIN_ADDRESS,
    replyTo: process.env.REPLYTO_ADDRESS,
    subject: process.env.FLAG_BREWERY_SUBJECT_LINE,
    text:
      "Hello Creator," +
      "\n\n" +
      "BrewBuzz user no. " +
      userId +
      " has flagged brewery number " +
      req.body.BreweryId +
      ". It has received a type " +
      req.body.flagoptionsId +
      " flag with the following notes:\n\n " +
      req.body.note +
      "\n\n" +
      "Please validate the flag on the breweries website and update the database if necessary. Once completed, change value of the completed column in Flagged Breweries table to 1. Thanks." +
      "\n\n" +
      "Flag Types: 1 (Changed Location), 2 (Temporarily Closed), 3 (Permanently Closed), 4 (Other)",
  };

  //send email
  transport.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
});

module.exports = router;
