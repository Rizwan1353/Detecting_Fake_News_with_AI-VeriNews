# ================================
# Fake News Detection (news.csv)
# ================================

import pandas as pd
import re
import joblib

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

import nltk
nltk.download("stopwords")
from nltk.corpus import stopwords

# ================================
# Load Dataset
# ================================

data = pd.read_csv("news.csv")

print("Dataset columns:", data.columns)

# ================================
# Keep Only Required Columns
# ================================

# Change column names HERE if needed
X = data["text"]
y = data["label"]

# ================================
# Text Cleaning
# ================================

stop_words = stopwords.words("english")

def clean_text(text):
    text = str(text).lower()
    text = re.sub(r'\W', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    words = text.split()
    words = [word for word in words if word not in stop_words]
    return " ".join(words)

X = X.apply(clean_text)

# ================================
# Train-Test Split
# ================================

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ================================
# Vectorization
# ================================

vectorizer = TfidfVectorizer(max_features=5000)
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# ================================
# Model Training
# ================================

model = LogisticRegression()
model.fit(X_train_vec, y_train)

# ================================
# Evaluation
# ================================

y_pred = model.predict(X_test_vec)
accuracy = accuracy_score(y_test, y_pred)

print("Model Accuracy:", accuracy)

# ================================
# Save Model
# ================================

joblib.dump(model, "model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")

print("Model & Vectorizer saved successfully")
