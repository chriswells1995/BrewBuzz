// Dependencies
// =============================================================
const express = require("express");
const router = express.Router();
const db = require("../models");
const nodemailer = require("nodemailer");

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
router.get("/api/flaggedbreweries", function (req, res) {
  // Finding all Breweries, and then returning them to the user as JSON.
  // Sequelize queries are asynchronous, which helps with perceived speed.
  db.FlaggedBreweries.findAll({
    include: [db.FlagOptions, db.Brewery, db.User],
  })
    .then((results) => res.json(results))
    .catch((err) => res.status(500).json(err));
});

// Add an option
router.post("/api/flaggedbrewery", function (req, res) {
  // reference the brewery model and then utilize the sequelize.create
  // built in method to create a new brewery
  // inside .create() we reference the author and body columns we feed
  // those columns values from req.body
  db.FlaggedBreweries.create({
    // adding req.body(response) to name, website, streetAddress
    BreweryId: req.body.BreweryId,
    note: req.body.note,
    flagoptionsId: req.body.flagoptionsId,
    UserId: req.body.UserId,
    completed: 0
  }

  )
    .then(() => res.json(true))
    .catch((err) => res.status(500).json(err));

  //create email
  const message = {
    from: process.env.SENDER_ADDRESS,
    to: process.env.ADMIN_ADDRESS,
    replyTo: process.env.REPLYTO_ADDRESS,
    subject: process.env.FLAG_BREWERY_SUBJECT_LINE,
    text:
      "A brewery has been flagged. Please check " +
      process.env.FLAG_BREWERY_LINK +
      " to see if the flag is accurate and update the database if necessary. Thanks.",
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
