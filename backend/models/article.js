const express = require("express");
const router = express.Router();
const { predictNews } = require("../services/mlService");

router.post("/predict", async (req, res) => {
  try {
    const { text } = req.body;

    const result = await predictNews(text);

    res.json({
      prediction: result.prediction,
      confidence: result.confidence
    });
  } catch (err) {
    res.status(500).json({ error: "Prediction failed" });
  }
});

module.exports = router;
