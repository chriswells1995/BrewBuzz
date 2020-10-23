// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const express = require("express");
const router = express.Router();

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/", function (req, res) {
  // If the user already has an account send them to their user page
  if (req.user) {
    res.redirect("/userlanding");
  }
  // Else send them to the landing page
  res.sendFile(path.join(__dirname, "../public/landing.html"));
});


// temp
router.get("/loop", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/loop.html"));
});

router.get("/signup", function(req, res) {

  // If the user already has an account send them to their user page
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

router.get("/userlanding", function (req, res) {
  // If the user already has an account send them to their user page
  res.sendFile(path.join(__dirname, "../public/userLanding.html"));
});

router.get("/landing", function (req, res) {
  // If the user already has an account send them to their user page
  if (req.user) {
    res.redirect("/userLanding.html");
  }
  // Else send them to the landing page
  res.sendFile(path.join(__dirname, "../public/landing.html"));
});

// forgot password
router.get("/forgotpassword", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/forgot-password.html"));
});

// reset password

router.get("/resetpassword", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/resetpassword.html"));
});

// nearby breweries

router.get("/nearby", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/nearby.html"));
});

// brewery html
router.get("/brewery/:id", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/brewery.html"));
});

// brewery html
router.get("/search/:input", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/search.html"));
});

// user html
router.get("/user/:id", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/user.html"));
});

// login html (A.K.A. hive)
router.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

// catchall route
router.get("*", function (req, res) {
  // If the user already has an account send them to user landing page
  if (req.user) {
    res.redirect("/userLanding.html");
  }
  // Else send them to the landing page
  res.sendFile(path.join(__dirname, "../public/landing.html"));
});

module.exports = router;
