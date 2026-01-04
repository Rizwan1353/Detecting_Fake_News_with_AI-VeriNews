const axios = require("axios");

const predictNews = async (text) => {
  const response = await axios.post("http://127.0.0.1:8000/predict", {
    text: text
  });

  return {
    prediction: response.data.prediction,
    confidence: response.data.confidence
  };
};

module.exports = { predictNews };
