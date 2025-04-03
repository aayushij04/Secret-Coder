// const mongoose = require("mongoose");

// const contactSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     subject: { type: String, required: true },
//     message: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Contact", contactSchema);








document.getElementById("contact-form").addEventListener("submit", async function(event) {
  event.preventDefault(); // Stop default `mailto:` behavior

  const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("useremail").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value
  };

  const response = await fetch("http://localhost:5000/api/contact", { // Adjust API URL if needed
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
  });

  const data = await response.json();
  alert(data.message);
});