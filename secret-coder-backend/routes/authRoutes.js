// // const express = require('express');
// // const router = express.Router();
// // const User = require('../models/User'); // Mongoose model

// // // Register Route
// // router.post('/register', async (req, res) => {
// //     console.log("Received Data:", req.body); // Logs data sent by user

// //     try {
// //         const { name, email, password } = req.body;
// //         const newUser = new User({ name, email, password });
// //         await newUser.save();
// //         res.status(201).json({ message: "User registered successfully!" });
// //     } catch (error) {
// //         res.status(500).json({ error: "Internal Server Error" });
// //     }
// // });

// // module.exports = router;






// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// // const User = require("../models/User");

// const router = express.Router();

// // User Signup
// router.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user exists
//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ message: "User already exists!" });

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Save new user
//     user = new User({ name, email, password: hashedPassword });
//     await user.save();

//     res.status(201).json({ message: "User registered successfully!" });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // User Login
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid Credentials" });

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

//     // Generate token
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     res.json({ token, userId: user._id });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// module.exports = router;















const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = "JWT_SECRET";  // Change it in production

// Signup Route
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Received Signup Request:", req.body); // Log request data

  try {
    let user = await User.findOne({ email });
    if (user) {
      console.log("User already exists!");
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    console.log("User Registered Successfully!");
    res.status(201).json({ message: "Signup successful!" });
  } catch (error) {
    console.error("Signup Error:", error); // Log full error
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
