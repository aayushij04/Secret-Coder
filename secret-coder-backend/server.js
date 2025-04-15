// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const cors = require("cors");
// const path = require("path");

// const app = express();

// app.use(express.json());
// app.use(cors());




// const PORT = process.env.PORT || Math.floor(Math.random() * (6000 - 3000 + 1)) + 3000;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));








// const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/secret-coder"; 
// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; 

// // ✅ Connect to MongoDB
// mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("✅ MongoDB Connected"))
//     .catch(err => console.error("❌ MongoDB Connection Error:", err));

// // ✅ Define User Schema & Model
// const UserSchema = new mongoose.Schema({
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// });

// const User = mongoose.model("User", UserSchema);

// // ✅ Serve Static Files (for frontend)
// app.use(express.static(path.join(__dirname, "public"))); 

// // ✅ Signup Route
// app.post("/signup", async (req, res) => {
//     const { email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     try {
//         const user = await User.create({ email, password: hashedPassword });
//         res.status(201).json({ message: "User created successfully" });
//     } catch (err) {
//         res.status(400).json({ error: "Email already exists" });
//     }
// });

// // ✅ Login Route
// app.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//         return res.status(401).json({ error: "Invalid credentials" });
//     }

//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
//     res.json({ token });
// });

// // ✅ Serve Frontend (index.html)
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// // ✅ Start Server
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const cors = require("cors");
// const path = require("path");

// const app = express();

// app.use(express.json());
// app.use(cors());




// const PORT = process.env.PORT || Math.floor(Math.random() * (6000 - 3000 + 1)) + 3000;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));








// const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/secret-coder"; 
// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; 

// // ✅ Connect to MongoDB
// mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("✅ MongoDB Connected"))
//     .catch(err => console.error("❌ MongoDB Connection Error:", err));

// // ✅ Define User Schema & Model
// const UserSchema = new mongoose.Schema({
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// });

// const User = mongoose.model("User", UserSchema);

// // ✅ Serve Static Files (for frontend)
// app.use(express.static(path.join(__dirname, "public"))); 

// // ✅ Signup Route
// app.post("/signup", async (req, res) => {
//     const { email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     try {
//         const user = await User.create({ email, password: hashedPassword });
//         res.status(201).json({ message: "User created successfully" });
//     } catch (err) {
//         res.status(400).json({ error: "Email already exists" });
//     }
// });

// // ✅ Login Route
// app.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//         return res.status(401).json({ error: "Invalid credentials" });
//     }

//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
//     res.json({ token });
// });

// // ✅ Serve Frontend (index.html)
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// // ✅ Start Server
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));




















const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();


// ✅ Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json()); // ✅ Ensures JSON parsing

// ✅ Serve Static Files (Fixing MIME Type Issues)
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/lib", express.static(path.join(__dirname, "..", "lib")));
app.use("/css", express.static(path.join(__dirname, "..", "public", "css")));
app.use("/js", express.static(path.join(__dirname, "..", "public", "js")));
app.use("/images", express.static(path.join(__dirname, "..", "public", "images")));

// ✅ Serve `index.html`
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));


// ✅ Import Routes
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes"); // ✅ Added Contact Routes
const instructorRoutes = require("./routes/instructorRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes); 
app.use("/api/instructors", instructorRoutes);
// ✅ Handles contact form submission

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

app.use("*", (req, res) => {
  console.log("⚠️ Unknown route hit:", req.originalUrl);
  res.status(404).send("Route not found");
});





// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");

// const authRoutes = require("./routes/authRoutes");
// const contactRoutes = require("./routes/contactRoutes");

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());



// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/public/index.html");
// });


// app.get("/contact", (req, res) => {
//   res.sendFile(__dirname + "/public/contact.html");
// });

// // ✅ Serve static files from the "public" directory
// app.use(express.static("public"));
// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/contact", contactRoutes);

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected successfully"))
//   .catch((err) => console.log("MongoDB connection error:", err));

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
