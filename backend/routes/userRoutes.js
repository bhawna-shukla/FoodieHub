const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const router = express.Router();

// Signup API
router.post("/signup", async (req, res) => {
  // tumhara existing signup code
});

// Login API
router.post("/login", async (req, res) => {
  // login code
});

module.exports = router;