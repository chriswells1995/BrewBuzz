// Dependencies
// =============================================================
const express = require('express')
const router = express.Router();
const db = require("../models");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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

// DATETIME converter
var currentDate = new Date();
// pull current date info
var year = currentDate.getFullYear();
var month = currentDate.getMonth();
var date = currentDate.getDate();
// pull current time info
var hours = currentDate.getHours() + 1;
var minutes = currentDate.getMinutes();
var seconds = currentDate.getSeconds();

var expireDate = 
// date
year + "-" + ("0"+(month+1)) + "-" + date + " "
// time
+ hours + ":" + minutes + ":" + seconds;


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

    // TODO: get the date to auto create and increment + 1 hr

    // var expireDate = new Date();
    // expireDate.setDate(expireDate.getDate() + 1/24);

    // var expireDate = "2020-09-16 12:17:00"
   
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
        text: 'To reset your password, please click the link below.\n\nhttps://'+process.env.DOMAIN+'/resetpassword?token='+encodeURIComponent(token)+'&email='+req.body.email
    };
   
    //send email
    transport.sendMail(message, function (err, info) {
       if(err) { console.log(err)}
       else { console.log(info); }
    });
   
    return res.json({status: 'ok'});
  });

  router.get('/reset-password', async function(req, res, next) {
    /**
     * This code clears all expired tokens. You
     * should move this to a cronjob if you have a
     * big site. We just include this in here as a
     * demonstration.
     **/
    await db.ResetToken.destroy({
      where: {
        expiration: { [Op.lt]: Sequelize.fn('CURDATE')},
      }
    });
   
    //find the token
    var record = await db.ResetToken.findOne({
      where: {
        email: req.query.email,
        expiration: { [Op.gt]: Sequelize.fn('CURDATE')},
        token: req.query.token,
        used: 0
      }
    });
   
    if (record == null) {
      return res.render('/user/reset-password', {
        message: 'Token has expired. Please try password reset again.',
        showForm: false
      });
    }
   
    res.render('/user/reset-password', {
      showForm: true,
      record: record
    });
  });

  router.post('/user/resetpassword', async function(req, res, next) {
    //compare passwords
    if (req.body.password1 !== req.body.password2) {
      return res.json({status: 'error', message: 'Passwords do not match. Please try again.'});
    }
   
    /**
    * Ensure password is valid (isValidPassword
    * function checks if password is >= 8 chars, alphanumeric,
    * has special chars, etc)
    **/
    if (!req.body.password1) {
      return res.json({status: 'error', message: 'Password does not meet minimum requirements. Please try again.'});
    }
   
    var record = await db.ResetToken.findOne({
      where: {
        email: req.body.email,
        expiration: { [Op.gt]: Sequelize.fn('CURDATE')},
        token: req.body.token,
        used: 0
      }
    });
   
    if (record == null) {
      return res.json({status: 'error', message: 'Token not found. Please try the reset password process again.'});
    }
   
    var upd = await db.ResetToken.update({
        used: 1
      },
      {
        where: {
          email: req.body.email
        }
    });
   
    var newSalt = crypto.randomBytes(64).toString('hex');
    var newPassword = crypto.pbkdf2Sync(req.body.password1, newSalt, 10000, 64, 'sha512').toString('base64');
   
    await db.User.update({
      password: newPassword,
      salt: newSalt
    },
    {
      where: {
        email: req.body.email
      }
    });
   
    return res.json({status: 'ok', message: 'Password reset. Please login with your new password.'});
  });

module.exports = router;