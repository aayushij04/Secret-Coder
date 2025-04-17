
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/lib", express.static(path.join(__dirname, "..", "lib")));
app.use("/css", express.static(path.join(__dirname, "..", "public", "css")));
app.use("/js", express.static(path.join(__dirname, "..", "public", "js")));
app.use("/images", express.static(path.join(__dirname, "..", "public", "images")));

// Serve pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "dashboard.html"));
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Error:", err));

// Routes
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const instructorRoutes = require("./routes/instructorRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/instructors", instructorRoutes);

// Run code route
app.post("/run-code", (req, res) => {
  const { code, languageId } = req.body;

  if (!code || !languageId) {
    return res.status(400).json({ error: "Code or languageId missing" });
  }

  switch (languageId) {
    case 63: // JavaScript
      try {
        const result = eval(code);
        res.json({ stdout: result?.toString() ?? "undefined" });
      } catch (err) {
        res.json({ stderr: err.message });
      }
      break;

    case 71: // Python
      exec(`python3 -c "${code.replace(/"/g, '\\"')}"`, (err, stdout, stderr) => {
        if (err || stderr) {
          res.json({ stderr: stderr || err.message });
        } else {
          res.json({ stdout });
        }
      });
      break;

    case 54: // C++
      const filename = "temp_code.cpp";
      const execName = "temp_code.out";

      fs.writeFileSync(filename, code);

      exec(`g++ ${filename} -o ${execName}`, (err, stdout, stderr) => {
        if (err || stderr) {
          return res.json({ stderr: stderr || err.message });
        }

        exec(`./${execName}`, (err, stdout, stderr) => {
          if (err || stderr) {
            return res.json({ stderr: stderr || err.message });
          }
          res.json({ stdout });
        });
      });
      break;

    default:
      res.status(400).json({ error: "Unsupported languageId" });
  }
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).send("Route not found");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});