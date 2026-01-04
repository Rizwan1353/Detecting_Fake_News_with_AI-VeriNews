import React, { useState } from "react";
import API from "../api";

const CheckNews = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!content) return alert("Please enter news content");

    setLoading(true);
    try {
      const res = await API.post("/api/articles/check", {
        title,
        content
      });
      setResult(res.data);
    } catch (err) {
      alert("Error checking news");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>AI Fake News Detector</h2>

      <input
        placeholder="News Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <textarea
        placeholder="Paste news article here..."
        rows={6}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%" }}
      />

      <button onClick={handleCheck} disabled={loading}>
        {loading ? "Checking..." : "Check News"}
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Result: {result.prediction}</h3>
          <p>Confidence: {result.confidence}</p>
        </div>
      )}
    </div>
  );
};

export default CheckNews;
