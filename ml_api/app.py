from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

# ==========================
# App Setup
# ==========================

app = Flask(__name__)
CORS(app)

# ==========================
# Load Model & Vectorizer
# ==========================

model = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

# ==========================
# Prediction Route
# ==========================

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    if "text" not in data:
        return jsonify({"error": "No text provided"}), 400

    text = data["text"]

    vector = vectorizer.transform([text])
    prediction = model.predict(vector)[0]
    confidence = model.predict_proba(vector).max()

    result = "Real" if prediction == 1 else "Fake"

    return jsonify({
        "result": result,
        "confidence": round(float(confidence), 2)
    })

# ==========================
# Run Server
# ==========================

if __name__ == "__main__":
    app.run(port=8000, debug=True)
