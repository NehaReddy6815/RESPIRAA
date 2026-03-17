from fastapi import FastAPI
import joblib
import pandas as pd

app = FastAPI()

# 🔥 Load trained model
model = joblib.load("model.pkl")

@app.get("/")
def home():
    return {"message": "ML API is running 🚀"}

# 🔥 Prediction endpoint
@app.post("/predict")
def predict(data: dict):
    try:
        # Convert input to DataFrame
        df = pd.DataFrame([{
            "AQI": data.get("AQI"),
            "PM2.5": data.get("PM2.5"),
            "PM10": data.get("PM10")
        }])

        # 🔮 Predict
        prediction = model.predict(df)[0]
        score = int(prediction)

        # 🚨 Risk classification
        if score > 70:
            risk = "HIGH"
        elif score > 40:
            risk = "MODERATE"
        else:
            risk = "LOW"

        return {
            "score": score,
            "risk": risk
        }

    except Exception as e:
        return {
            "error": str(e)
        }