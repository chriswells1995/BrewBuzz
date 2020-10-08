// Dependencies
const express = require('express')
const router = express.Router();
const path = require("path");
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

// Creates a timestamp in datetime format one hour in the future
var currentDate = new Date();
// pull current date info
var year = currentDate.getFullYear();
var month = currentDate.getMonth();
var date = currentDate.getDate();
// pull current time info
var hours = currentDate.getHours() + 1;
var minutes = currentDate.getMinutes();
var seconds = currentDate.getSeconds();
// create expireDate 1 hour in the future
var expireDate = 
// date
year + "-" + ("0"+(month+1)) + "-" + date + " "
// time
+ hours + ":" + minutes + ":" + seconds;

var stringDate = expireDate.toString();

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

// Get route for forgotpassword
router.get('/forgot-password', function(req, res, next) {
  res.render('/user/forgotpassword', { });
});

// Post route for forgotpassword
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

  // update token to 1 (used) to prevent reuse

  await db.ResetToken.update({
      used: 1
    },
    {
      where: {
        email: req.body.email
      }
  }).catch (function (err) {
    console.log("reset token update")
  });
  
  //Create a random reset token
  var token = crypto.randomBytes(64).toString('base64');

  //insert token data into DB
  await db.ResetToken.create({
    email: req.body.email,
    expiration: stringDate,
    token: token,
    used: 0
  }).catch (function (err) {
    console.log("reset token create")
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

// Post route for forgotpassword
router.get('/resetpassword', async function(req, res, next) {

  // Clear all expired tokens
  await db.ResetToken.destroy({
    where: {
      expiration: { [Op.lt]: Sequelize.fn('CURDATE')},
    }
  }).catch (function (err) {
    console.log("reset token destroy")
  });
  
  //find the token
  var record = await db.ResetToken.findOne({
    
    where: {
      email: req.query.email,
      // expiration: { [Op.gt]: Sequelize.fn('CURDATE')},
      // token: req.query.token,
      used: 0
    }
    }).catch (function (err) {
      console.log("reset token var record")
  });
  
  console.log("record")
  console.log(record)
  
  if (record == null) {
    return res.status(401).json('/user/resetpassword', {
      message: 'Token has expired. Please try password reset again.',
      showForm: false
    });
  }
  
  res.status(202).sendFile(path.join(__dirname, "../public/resetpassword.html"))

  // res.status(202).json({
  //   status: 'ok',
  //   record: record
  // }).sendFile(path.join(__dirname, "../public/resetpassword.html"))
});

  router.post('/api/user/resetpassword', async function(req, res, next) {
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
    }).catch (function (err) {
      console.log("reset token findone var record")
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
    }).catch (function (err) {
      console.log("await update")
    });
   
    // TODO: Check this
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
    }).catch (function (err) {
      console.log("await user update")
    });
   
    return res.json({status: 'ok', message: 'Password reset. Please login with your new password.'});
  });

module.exports = router;