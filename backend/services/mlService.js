const axios = require("axios");

exports.checkArticle = async (text) => {
  const response = await axios.post(process.env.AI_SERVICE_URL, { text });
  return response.data;
};
