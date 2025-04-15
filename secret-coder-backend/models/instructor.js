const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const InstructorSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  degree: { type: String, required: true },
  subject: { type: String, required: true },
  address: { type: String, required: true },
});

const Instructor = mongoose.model("instructor", InstructorSchema);
module.exports = Instructor;
