// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const express = require('express');
const router = express.Router();

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/", function(req, res) {
  // If the user already has an account send them to their user page
  if (req.user) {
    res.redirect("/login");
  }
  // Else send them to the landing page
  res.sendFile(path.join(__dirname, "../public/landing.html"));
});

router.get("/signup", function(req, res) {
  // If the user already has an account send them to their user page
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

router.get("/landing", function(req, res) {
  // If the user already has an account send them to their user page
  if (req.user) {
    res.redirect("/login");
  }
  // Else send them to the landing page
  res.sendFile(path.join(__dirname, "../public/landing.html"));
});

router.get("/forgotpassword", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/forgot-password.html"));
});

// brewery html
router.get("/brewery/:id", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/brewery.html"));
});

// brewery html
router.get("/search/:input", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/search.html"));
});

// user html
router.get("/user/:id", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/user.html"));
});


// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/login", isAuthenticated, function(req, res) {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("*", function(req, res) {
  // If the user already has an account send them to the members page
  res.sendFile(path.join(__dirname, "../public/landing.html"));
});

module.exports = router;

