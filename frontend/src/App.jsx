import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [inputData, setInputData] = useState({
    AQI: "",
    pm25: "",
    pm10: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePredict = async () => {
    const res = await axios.post("http://localhost:5000/analyze", {
      AQI: Number(inputData.AQI),
      "PM2.5": Number(inputData.pm25),
      PM10: Number(inputData.pm10),
    });

    setResult(res.data);
  };

  return (
    <div className="app">
      {/* 🔥 HEADER */}
      <h1 className="title">🌍 RespiraHere</h1>
      <p className="subtitle">AI-powered Air Quality Intelligence</p>

      {/* 🔥 INPUT PANEL */}
      <div className="input-panel">
        <input name="AQI" placeholder="AQI" onChange={handleChange} />
        <input name="pm25" placeholder="PM2.5" onChange={handleChange} />
        <input name="pm10" placeholder="PM10" onChange={handleChange} />
        <button onClick={handlePredict}>Predict</button>
      </div>

      {/* 🔥 RESULT */}
      {result && (
        <>
          {/* 🧠 SCORE CARD */}
          <div className="score-card">
            <h2>🧠 Microplastic Index</h2>
            <h1 className="score">{result.score}</h1>
            <p className={`risk ${result.risk}`}>{result.risk}</p>
          </div>

          {/* 💡 INSIGHT */}
          <div className="insight-box">
            <h3>AI Insight</h3>
            <p>{result.insight}</p>
          </div>

          {/* 🚀 RECOMMENDATIONS */}
          <div className="recommendations">
            <h3>Recommendations</h3>
            <div className="cards">
              {result.advice.map((item, i) => (
                <div className="card" key={i}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;