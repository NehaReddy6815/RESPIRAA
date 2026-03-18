# 🌍 SafeSphere — AI-Powered Air Quality Monitoring System

SafeSphere is a full-stack intelligent system that analyzes air quality using a hybrid AI approach combining Machine Learning, rule-based logic, and LLM-generated insights.

---

## 📌 Project Overview

SafeSphere monitors environmental conditions using:

* AQI
* PM2.5
* PM10

and provides:

* 📊 AI-based score prediction
* ⚠️ Health risk classification
* 🧠 LLM-powered insights & recommendations
* 🗺️ Interactive air quality maps
* 📈 Trend visualization

---

## 🎯 Core Idea (Hybrid AI System)

| Component | Approach         |
| --------- | ---------------- |
| Score     | ML Model         |
| Risk      | Rule-based logic |
| Insights  | LLM              |

👉 Why this works:

* ML → accurate prediction
* Rules → reliable health classification
* LLM → human-like explanations

---

## 🏗️ System Architecture

```id="arch1"
Frontend (React)
        ↓
Node.js Backend (Express)
        ↓
FastAPI (Python ML Service)
        ↓
ML Model (Gradient Boosting)
        ↓
MongoDB (Storage)
        ↓
LLM (Groq API)
```

---

## ⚙️ Tech Stack

### 🎨 Frontend

* React + TypeScript
* Vite
* Tailwind CSS
* Framer Motion
* ShadCN UI
* React Leaflet (Maps)
* Recharts (Charts)

### ⚙️ Backend

* Node.js
* Express.js
* Axios

### 🤖 ML & AI

* Python
* FastAPI
* Scikit-learn
* Gradient Boosting Regressor
* Groq LLM (LLaMA 3.1)

### 🗄️ Database

* MongoDB Atlas
* Mongoose

---

## 🤖 Machine Learning Model

### Model Used

```python
from sklearn.ensemble import GradientBoostingRegressor
```

### Input Features

* AQI
* PM2.5
* PM10

### Output

* Composite Air Quality Score

### Training

```python
X = df[["AQI", "PM2.5", "PM10"]]
y = df["score"]
```

### Evaluation

* MAE (Mean Absolute Error)

---

## ⚠️ Risk Classification (Rule-Based)

```python
if aqi <= 50:
    risk = "LOW"
elif aqi <= 100:
    risk = "MODERATE"
else:
    risk = "HIGH"
```

✅ Ensures reliability for health-related decisions

---

## 🧠 LLM Integration (Groq)

Used for:

* Insight generation
* Recommendations

### Example Output

* “Air quality is unhealthy…”
* “Wear a mask”
* “Avoid outdoor activities”

---

## Folder Structure

- `backend/`
  - `server.js` - Express server and routes
  - `routes/dataRoutes.js` - `/dataset`, `/analyze` endpoints
  - `controllers/dataController.js` - Dataset streaming + AI analysis controllers
  - `services/datasetService.js` - CSV loader + streaming simulation
  - `services/aiService.js` - Calls ML model and HF LLM for insights
  - `dataset/` - CSV files for data
  - `model.pkl` / `ml_api.py` / `generate_score.py` - ML model training/prediction
- `frontend/`
  - React + Vite real-time dashboard UI (`src/App.jsx`, `src/App.css`)
  - `package.json` with dependencies `axios`, `chart.js`, `react-chartjs-2`
  - `README.md` with frontend-specific run docs
- `safesphere-air-insights/`
  - React + TS + ShadCN UI app with auth and multi-page analytics
  - `src/pages` contains Dashboard, Analyze, Trends, Insights, Profile flows
  - `src/integrations/supabase` for backend integration
  - `README.md` with focused UI doc
## 🗄️ Database Schema

```json
{
  "AQI": Number,
  "PM25": Number,
  "PM10": Number,
  "score": Number,
  "risk": String,
  "insight": String,
  "advice": [String],
  "createdAt": Date
}
```

---

## 🗺️ Air Quality Map Feature
. Data Source

“We use real-time AQI data from an external API (based on OpenWeather), which aggregates government sensors and environmental models.”

### Tech Used

* React + TypeScript
* Leaflet
* OpenWeather API
* Axios

### How It Works

* Predefined Bangalore locations
* Backend fetches AQI using:

  ```
  /analyze/aqi?lat={lat}&lon={lon}
  ```
* Frontend uses `Promise.all()` to fetch all data

### Visualization

* 🟢 Green → Good
* 🟠 Orange → Moderate
* 🔴 Red → Poor

### Features

* Circle markers with AQI intensity
* Popups (AQI, PM2.5, PM10)
* Top polluted areas
* Auto-refresh

---

## 📈 Trends & Data Visualization

### What the graph shows

* Timeline of user analyses stored in MongoDB

### Axes

* X → Time (createdAt)
* Y → AQI, PM2.5, PM10

### Lines

| Metric | Color  |
| ------ | ------ |
| AQI    | Teal   |
| PM2.5  | Yellow |
| PM10   | Purple |

⚠️ Graph appears “spiky” because:

* Data is user-triggered (not continuous)
* Values vary per input

---

## ⚙️ Backend Flow

```id="flow1"
User Input → Node API → FastAPI → ML Score
                     → LLM → Insights
                     → MongoDB → Save
                     → Response → Frontend
```

---

## 🎨 Frontend Features

* Analyze air quality form
* Score + risk badge
* AI insights section
* Recommendations list
* Dashboard overview
* Trend graphs
* Interactive map
* Health onboarding

---

## 🚀 How to Run

### 1️⃣ Backend

```bash
cd backend
npm install
node server.js
```

---

### 2️⃣ ML Service

```bash
uvicorn ml_api:app --reload
```

---

### 3️⃣ Frontend

```bash
cd safesphere-air-insights
npm install
npm run dev
```

---

## 🔥 Key Features

✔ ML-based scoring
✔ Rule-based safety logic
✔ LLM-generated insights
✔ MongoDB persistence
✔ Interactive maps
✔ Real-time UI updates

---

## 💡 Future Improvements

* Live AQI sensors
* GPS-based tracking
* Time-series forecasting
* Mobile app

---

## 🧠 Conclusion

SafeSphere demonstrates a hybrid AI architecture combining:

* Machine Learning
* Rule-based systems
* Generative AI

to deliver reliable and intelligent air quality monitoring.

---

## 💬 Demo Line

"SafeSphere combines ensemble machine learning, rule-based safety logic, and LLM-driven insights to deliver reliable and intelligent air quality monitoring."

---

## 👩‍💻 Author

Neha Reddy

---
