const express = require("express");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// ✅ Define Contact Schema
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, match: /\S+@\S+\.\S+/ },
  subject: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", ContactSchema);

// ✅ POST: Store Contact Form Data
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required").trim(),
    body("email").isEmail().withMessage("Invalid email format").trim(),
    body("subject").notEmpty().withMessage("Subject cannot be empty").trim(),
    body("message").notEmpty().withMessage("Message cannot be empty").trim(),
  ],
  async (req, res) => {
    console.log("Received Request Body:", req.body); // ✅ Debugging step

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("Validation Errors:", errors.array()); // ✅ Debugging step
        return res.status(400).json({ message: "Validation failed", errors: errors.array() });
      }

      const { name, email, subject, message } = req.body; // ✅ Fix: Added subject

      if (mongoose.connection.readyState !== 1) {
        console.log("Database connection failed");
        return res.status(500).json({ message: "Database not connected. Please try again later." });
      }

      const newContact = new Contact({ name, email, subject, message });
      await newContact.save();

      res.status(201).json({ message: "Message sent successfully!" });
    } catch (err) {
      console.error("❌ Error saving contact form:", err.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

module.exports = router;
