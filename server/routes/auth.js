const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require('dotenv');
const router = express.Router();

dotenv.config();

// User Registration
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body; // Accept email in the request

  try {
    // Check if the user with the same username or email already exists
    let user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      return res
        .status(400)
        .json({ msg: "User with this username or email already exists" });
    }

    // Create new user
    user = new User({ username, email, password });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// User Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "No user found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password" });
    }

    // Return JWT Token
    const payload = { user: { id: user.id } };
    let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Set the token as an HttpOnly cookie
    // res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'strict', maxAge: 3600000, }); //for 1hr

    //storing token in cookie
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',  // Enable secure cookies in production
    };

    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user,
      message: "User logged in successfully",
    });

  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
