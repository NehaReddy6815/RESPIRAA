# 🌍 SafeSphere Air Insights (Frontend UI)

SafeSphere is a modern AI-powered air quality dashboard UI designed to visualize microplastic exposure risk using environmental indicators like AQI, PM2.5, and PM10.

This project focuses purely on the **frontend interface**, built for a clean, interactive, and real-time user experience.

---

## 🚀 Tech Stack

* ⚛️ React (with TypeScript)
* ⚡ Vite
* 🎨 Tailwind CSS
* 🧩 Component-based architecture
* 📊 Recharts (for trends/graphs)
* 🎭 Framer Motion (animations)

---

## 📁 Project Structure

### 📂 public/

* Static assets like icons, favicon, and images

---

### 📂 src/

#### 📂 components/

Reusable UI components used across the app:

* Cards, buttons, UI elements
* Layout components
* Common design blocks

---

#### 📂 pages/

Main application screens:

* **Dashboard.tsx** → Displays air quality metrics, risk level, and insights
* **Analyze.tsx** → User input form (AQI, PM2.5, PM10) and triggers prediction
* **Trends.tsx** → Shows historical trends using charts
* **Insights.tsx** → Displays AI-generated insights and recommendations
* **Profile.tsx** → User profile and stats
* **HealthOnboarding.tsx** → Collects user health details (age, conditions, etc.)

---

#### 📂 hooks/

Custom React hooks:

* Handles shared logic
* May include state management or reusable behaviors

---

#### 📂 integrations/supabase/

* Handles authentication and database (can be removed if not needed)

---

#### 📄 App.tsx

* Main app layout and routing between tabs

#### 📄 main.tsx

* Entry point of the React application

#### 📄 index.css

* Global styles (Tailwind base)

---

## ⚙️ Config Files

* **vite.config.ts** → Vite build configuration
* **tailwind.config.ts** → Tailwind styling setup
* **tsconfig.json** → TypeScript configuration
* **postcss.config.js** → Tailwind/PostCSS setup

---

## ✨ Features

* 📊 Dashboard with air quality metrics
* 🧪 Analyze air quality via user input
* 📈 Trends visualization
* 🧠 AI insights and recommendations
* 👤 User onboarding for personalization

---

## 🧪 Running Locally

```bash
npm install
npm run dev
```

Then open:

```bash
http://localhost:5173
```

---

## 🔗 Notes

* This is a **frontend-only project**
* Designed to connect with a backend API (`/analyze`)
* Authentication (Supabase) can be optionally removed for simpler usage

---

## 💡 Future Improvements

* Connect live air quality APIs
* Add real-time updates
* Enhance personalization using user data
* Improve animations and UX

---

## 🏆 Built For

Hackathons, AI projects, and real-time environmental monitoring applications.
