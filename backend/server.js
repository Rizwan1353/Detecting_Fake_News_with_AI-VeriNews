const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
require("dotenv").config();

const User = require("./models/User");
const Article = require("./models/Article");

const app = express();
app.use(cors());
app.use(express.json());

/* ==========================
   AUTH MIDDLEWARE
========================== */
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

/* ==========================
   AUTH ROUTES
========================== */
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashed });

  res.json({ message: "User registered" });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

/* ==========================
   ARTICLE CHECK ROUTE
========================== */
app.post("/api/articles/check", auth, async (req, res) => {
  const { title, content } = req.body;

  // Call ML API
  const mlRes = await axios.post("http://localhost:8000/predict", {
    text: content
  });

  const article = await Article.create({
    title,
    content,
    prediction: mlRes.data.result,
    confidence: mlRes.data.confidence,
    user: req.user.id
  });

  res.json(article);
});

/* ==========================
   DATABASE + SERVER
========================== */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));
