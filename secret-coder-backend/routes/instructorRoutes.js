const express = require('express');
const router = express.Router();
const Instructor = require('../models/Instructor'); // ✅ Ensure the model path is correct

router.post("/", async (req, res) => {
  console.log("📥 FULL request body:", req.body);

  const { firstName, lastName, email, phone, degree, subject, address } = req.body;

  const fields = [firstName, lastName, email, phone, degree, subject, address];
  const fieldNames = ["firstName", "lastName", "email", "phone", "degree", "subject", "address"];

  for (let i = 0; i < fields.length; i++) {
    if (!fields[i] || !fields[i].toString().trim()) {
      console.log(`❌ Field "${fieldNames[i]}" is missing or empty`);
      return res.status(400).json({ message: "All fields are required" });
    }
  }

  try {
    const newInstructor = new Instructor({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      degree: degree.trim(),
      subject: subject.trim(),
      address: address.trim(),
    });

    await newInstructor.save();
    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("❌ Save error:", error);
    res.status(500).json({ message: "Server error. Please try again later." }); // ✅ This line was missing!
  }
});

module.exports = router;
