// @ts-nocheck
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";

type AQIData = {
  name: string;
  lat: number;
  lon: number;
  aqi: number;
  pm25: number;
  pm10: number;
};

const locations = [
  { name: "Indiranagar", lat: 12.9719, lon: 77.6412 },
  { name: "Whitefield", lat: 12.9698, lon: 77.75 },
  { name: "BTM", lat: 12.9166, lon: 77.6101 },
  { name: "Yelahanka", lat: 13.1005, lon: 77.5963 },
  { name: "Electronic City", lat: 12.8456, lon: 77.6603 },
  { name: "Marathahalli", lat: 12.9591, lon: 77.6974 },
  { name: "Koramangala", lat: 12.9352, lon: 77.6245 },
  { name: "Hebbal", lat: 13.0358, lon: 77.597 },
  { name: "Jayanagar", lat: 12.925, lon: 77.5938 },
  { name: "Malleshwaram", lat: 13.0035, lon: 77.57 },
];

const getColor = (aqi: number) => {
  if (aqi <= 2) return "#22c55e"; // green
  if (aqi === 3) return "#f59e0b"; // orange
  if (aqi === 4) return "#ef4444"; // red
  return "#7f1d1d"; // dark red
};

const AQIMap = () => {
  const [data, setData] = useState<AQIData[]>([]);

  useEffect(() => {
    const fetchAQI = async () => {
      try {
        const results = await Promise.all(
          locations.map(async (loc) => {
            try {
              const res = await axios.get(
                `http://localhost:5000/analyze/aqi?lat=${loc.lat}&lon=${loc.lon}`
              );

              if (!res.data || !res.data.list) {
                return { ...loc, aqi: 1, pm25: 0, pm10: 0 };
              }

              const item = res.data.list[0];

              return {
                ...loc,
                aqi: item?.main?.aqi ?? 1,
                pm25: item?.components?.pm2_5 ?? 0,
                pm10: item?.components?.pm10 ?? 0,
              };
            } catch {
              return { ...loc, aqi: 1, pm25: 0, pm10: 0 };
            }
          })
        );

        setData(results);
      } catch (err) {
        console.error("AQI fetch error:", err);
      }
    };

    fetchAQI();

    // 🔥 auto refresh
    const interval = setInterval(fetchAQI, 60000);
    return () => clearInterval(interval);
  }, []);

  // 🔥 top polluted
  const topPolluted = [...data]
    .sort((a, b) => b.aqi - a.aqi)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* MAP */}
      <MapContainer
        center={[12.9716, 77.5946] as [number, number]}
        zoom={11}
        style={{ height: "420px", width: "100%", borderRadius: "16px" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {data.map((loc, i) => (
          <CircleMarker
            key={i}
            center={[loc.lat, loc.lon] as [number, number]}
            radius={loc.aqi * 3}
            pathOptions={{
              color: getColor(loc.aqi),
              fillColor: getColor(loc.aqi),
              fillOpacity: 0.7,
            }}
          >
            <Popup>
              <b>{loc.name}</b>
              <br />
              AQI: {loc.aqi}
              <br />
              PM2.5: {loc.pm25}
              <br />
              PM10: {loc.pm10}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* LEGEND */}
      <div className="flex gap-6 text-sm">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500"></span> Good
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500"></span> Moderate
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span> Poor
        </span>
      </div>

      {/* TOP POLLUTED */}
      <div className="bg-white/5 p-4 rounded-xl">
        <h3 className="text-lg font-semibold mb-2">Most Polluted Areas</h3>
        {topPolluted.map((loc, i) => (
          <p key={i}>
            {loc.name} — AQI {loc.aqi}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AQIMap;