const mongoose = require("mongoose");

module.exports = mongoose.model("Article",
  new mongoose.Schema({
    title: String,
    content: String,
    prediction: String,
    confidence: Number,
    user: mongoose.Schema.Types.ObjectId
  })
);
