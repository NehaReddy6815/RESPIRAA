import pandas as pd

# Load dataset
df = pd.read_csv("dataset/Bangalore_AQI_Dataset.csv")

# 🧹 Keep only required columns
df = df[["AQI", "PM2.5", "PM10"]]


# Remove missing values (IMPORTANT)
df = df.dropna()

# 🧠 Generate score (you can tweak weights later)
def generate_score(row):
    score = (
        row["AQI"] * 0.5 +
        row["PM2.5"] * 0.3 +
        row["PM10"] * 0.2
    )
    return min(100, round(score))

# Apply function
df["score"] = df.apply(generate_score, axis=1)

# Save cleaned dataset
df.to_csv("dataset/cleaned_data.csv", index=False)

print("✅ Cleaned dataset created: cleaned_data.csv")