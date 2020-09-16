// Dependencies
// =============================================================
const express = require('express')
const router = express.Router();
const db = require("../models");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

// Configuring Nodemailer SMTP credentials
const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


// Routes
// =============================================================

  // Get all users
router.get("/api/users", function(req, res) {
  // Finding all Breweries, and then returning them to the user as JSON.
  // Sequelize queries are asynchronous, which helps with perceived speed.
  db.User.findAll({})
  .then(results => res.json(results))
  .catch(err => res.status(500).json(err))
});

// Get one user
router.get("/api/user/:id", function(req, res) {
    // Finding all Breweries, and then returning them to the user as JSON.
    // Sequelize queries are asynchronous, which helps with perceived speed.
    db.User.findAll({
        where: {
            id: req.params.id
        }
    })
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err))
  });

  // Get route for forgot-password
  router.get('/forgot-password', function(req, res, next) {
    res.render('/user/forgot-password', { });
  });

  // Post route for forgot-password
  router.post('/user/forgotpassword', async function(req, res, next) {
    //ensure that you have a user with this email
    var email = await db.User.findOne({where: { email: req.body.email }});
    if (email == null) {
    /**
     * we don't want to tell attackers that an
     * email doesn't exist, because that will let
     * them use this form to find ones that do
     * exist.
     **/
      return res.json({status: 'ok'});
    }
    /**
     * Expire any tokens that were previously
     * set for this user. That prevents old tokens
     * from being used.
     **/
    await db.ResetToken.update({
        used: 1
      },
      {
        where: {
          email: req.body.email
        }
    });
   
    //Create a random reset token
    var token = crypto.randomBytes(64).toString('base64');
   
    //token expires after one hour
    // var expireDate = new Date();
    // expireDate.setDate(expireDate.getDate() + 1/24);

    var expireDate = "2020-09-16 12:17:00"
   
    //insert token data into DB
    await db.ResetToken.create({
      email: req.body.email,
      expiration: expireDate,
      token: token,
      used: 0
    });
   
    //create email
    const message = {
        from: process.env.SENDER_ADDRESS,
        to: req.body.email,
        replyTo: process.env.REPLYTO_ADDRESS,
        subject: process.env.FORGOT_PASS_SUBJECT_LINE,
        text: 'To reset your password, please click the link below.\n\nhttps://'+process.env.DOMAIN+'/user/reset-password?token='+encodeURIComponent(token)+'&email='+req.body.email
    };
   
    //send email
    transport.sendMail(message, function (err, info) {
       if(err) { console.log(err)}
       else { console.log(info); }
    });
   
    return res.json({status: 'ok'});
  });




module.exports = router;