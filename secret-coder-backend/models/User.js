// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// }, { timestamps: true });

// module.exports = mongoose.model("User", UserSchema);








const mongoose = require("mongoose");
const User = require("../models/User");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  codes: [{ type: String }]  // Store codes user has written
});

module.exports = mongoose.model("User", UserSchema);
