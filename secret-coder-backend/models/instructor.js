const mongoose = require("mongoose");

const InstructorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  expertise: { type: String, required: true },
  experience: { type: String, required: true },
});

const Instructor = mongoose.model("instructor", InstructorSchema);
module.exports = Instructor;
