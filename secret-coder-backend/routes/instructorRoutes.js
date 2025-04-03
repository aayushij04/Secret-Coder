const express = require("express");
const router = express.Router();
const Instructor = require("../models/instructor");

// Route to handle instructor application
router.get("/", (req, res) => {
  res.json({ message: "Instructor API is working!" });
});

router.post("/", async (req, res) => {
    try {
        const { f_name, l_name, email, phone, degree, subject, address } = req.body;

        if (!f_name || !l_name || !email || !phone || !degree || !subject || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newInstructor = new Instructor({ f_name, l_name, email, phone, degree, subject, address });

        await newInstructor.save();
        res.status(201).json({ message: "Application submitted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

module.exports = router;
