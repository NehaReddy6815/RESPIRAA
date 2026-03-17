import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error
import joblib

# 📥 Load dataset
df = pd.read_csv("dataset/cleaned_data.csv")

# 🎯 Features
X = df[["AQI", "PM2.5", "PM10"]]

# 🎯 Target
y = df["score"]

# ✂️ Split data (VERY IMPORTANT for real ML)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 🤖 Train model (STRONGER MODEL)
model = GradientBoostingRegressor(
    n_estimators=200,
    learning_rate=0.05,
    max_depth=3
)

model.fit(X_train, y_train)

# 📊 Evaluate model
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)

print(f"✅ Model trained. MAE: {mae:.2f}")

# 💾 Save model
joblib.dump(model, "model.pkl")

print("✅ Model saved as model.pkl")