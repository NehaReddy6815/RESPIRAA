# ?? Respira Full Project

Respira is an end-to-end environmental health system combining real-time IoT data streaming, AI/ML analysis, and interactive dashboards across multiple frontend apps.

## Project Overview

This repository contains three main components:

1. **Backend** (`backend/`): Node/Express API for dataset streaming and AI analysis.
2. **Frontend Dashboard** (`frontend/`): React + Vite UI for real-time environmental monitoring.
3. **SafeSphere Air Insights** (`safesphere-air-insights/`): Advanced UI app with auth, dashboards, trends, and insights.

The app uses data from a sample air quality dataset and AI analysis flows for recommendations.

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
  - `README.md` with focused UI docs

## Backend (API + ML)

### Key features

- Stream dataset records from CSV with incremental indexing
- `/dataset` endpoint returns live object updates
- `/analyze` endpoint calls local ML prediction server (`http://127.0.0.1:8000/predict`) and HF LLM for text insights
- AI Service supports fallback advice when external APIs fail

### Run backend

```bash
cd backend
npm install
node server.js
```

Then verify:
- `http://localhost:5000/`
- `http://localhost:5000/dataset`

## Frontend Dashboard (Simple Real-time UI)

### Run UI

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` or shown port.

### What it does

- Polls `http://localhost:5000/dataset` every 2 seconds
- Shows PM2.5, PM10, temperature, humidity, gas, motion, vibration cards
- Color-coded risk highlights and historical list
- Live chart updates using Chart.js

## SafeSphere Air Insights UI

### Run UI

```bash
cd safesphere-air-insights
npm install
npm run dev
```

Open `http://localhost:5173`.

### What it includes

- Auth flow, onboarding, dashboard, analysis, trends, insights, profile pages
- React Query data fetching, Tailwind UI components, responsive dashboard layout
- Supabase integration and data visualizations with Recharts

## Full Project Run Guide

1. Start backend:
   - `cd backend && node server.js`
2. Start frontend dashboard:
   - `cd frontend && npm run dev`
3. Start SafeSphere UI app (optional for additional UI):
   - `cd safesphere-air-insights && npm run dev`
4. Ensure local ML API is running at `http://127.0.0.1:8000/predict` for `/analyze`.

## Notes

- The repository contains multiple front-end apps; use each app's README for UI-specific details.
- Keep `backend` running while testing frontends.
- Add your Hugging Face API key in backend `.env` for AI insights.

## Where to look

- `backend/services/datasetService.js` — dataset streaming logic
- `backend/services/aiService.js` — ML + LLM integration and fallback
- `frontend/src/App.jsx` — minimal dashboard implementation
- `safesphere-air-insights/src/pages` — advanced UI pages

## License

[Add license here]
