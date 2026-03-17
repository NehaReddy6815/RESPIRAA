from fastapi import FastAPI
import joblib
import pandas as pd

app = FastAPI()

model = joblib.load("model.pkl")
print(type(model))


@app.post("/predict")
def predict(data: dict):
    try:
        # 🔥 Inputs
        aqi = float(data.get("AQI", 0))
        pm25 = float(data.get("PM2.5", 0))
        pm10 = float(data.get("PM10", 0))

        df = pd.DataFrame([{
            "AQI": aqi,
            "PM2.5": pm25,
            "PM10": pm10
        }])

        # 🔥 ML MODEL → SCORE
        prediction = model.predict(df)[0]

        # Ensure it's a number
        score = int(prediction)

        # 🔥 RULE-BASED RISK (NOT ML)
        if aqi <= 70:
            risk = "LOW"
        elif aqi <= 120:
            risk = "MODERATE"
        else:
            risk = "HIGH"

        return {
            "score": score,
            "risk": risk
        }

    except Exception as e:
        print("ERROR:", e)
        return {"error": str(e)}