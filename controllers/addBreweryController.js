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

// Add an option
router.post("/api/addbrewery", function (req, res) {
  // reference the brewery model and then utilize the sequelize.create
  // built in method to create a new brewery
  // inside .create() we reference the author and body columns we feed
  // those columns values from req.body
  db.AddBreweries.create({
    name: req.body.name,
    website: req.body.website,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    phone: req.body.phone,
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
      "Add this brewery to the database after validating information: " +
      "\n\n" +
      req.body.name +
      "\n\n" +
      req.body.website +
      "\n\n" +
      req.body.street +
      "\n\n" +
      req.body.city +
      "\n\n" +
      req.body.state +
      "\n\n" +
      req.body.zip +
      "\n\n" +
      req.body.phone,
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
