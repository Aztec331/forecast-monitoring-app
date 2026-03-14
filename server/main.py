from fastapi import FastAPI
import requests

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Wind Forecast Monitoring API is running"}


#Actual wind forecast data
#Blue line chart data
@app.get("/actual-wind-data")
def get_actual_wind_data():
    
    url = "https://data.elexon.co.uk/bmrs/api/v1/datasets/FUELHH"

    params = {
    "fuelType": "WIND",
    "publishDateTimeFrom": "2024-01-01T00:00:00Z",
    "publishDateTimeTo": "2024-01-07T23:30:00Z"
    }

    response = requests.get(url, params=params)

    data = response.json()

    return data

#Forecasted wind forecast data
#Green line chart data
@app.get("/forecast-wind-data")
def get_forecast_wind_data():

    url = "https://data.elexon.co.uk/bmrs/api/v1/datasets/WINDFOR"

    params = {
        "publishDateTimeFrom": "2024-01-01T00:00:00Z",
        "publishDateTimeTo": "2024-01-07T23:30:00Z"
    }

    response = requests.get(url, params=params)

    return response.json()

from datetime import datetime, timedelta

from datetime import datetime, timedelta


#GET http://127.0.0.1:8000/wind-data?start=2024-01-01T00:00:00Z&end=2024-01-07T23:30:00Z&horizon=4
@app.get("/wind-data")
def get_wind_data(start: str, end: str, horizon: int = 4):

    actual_url = "https://data.elexon.co.uk/bmrs/api/v1/datasets/FUELHH"
    forecast_url = "https://data.elexon.co.uk/bmrs/api/v1/datasets/WINDFOR"

    params = {
        "publishDateTimeFrom": start,
        "publishDateTimeTo": end
    }

    actual = requests.get(actual_url, params={"fuelType": "WIND", **params}).json()
    forecast = requests.get(forecast_url, params=params).json()

    actual_data = actual["data"]
    forecast_data = forecast["data"]

    filtered = []

    for a in actual_data:

        target_time = datetime.fromisoformat(a["startTime"].replace("Z",""))
        cutoff = target_time - timedelta(hours=horizon)

        valid = [
            f for f in forecast_data
            if datetime.fromisoformat(f["startTime"].replace("Z","")) == target_time
            and datetime.fromisoformat(f["publishTime"].replace("Z","")) <= cutoff
        ]

        if valid:
            latest = max(valid, key=lambda x: x["publishTime"])

            filtered.append({
                "time": a["startTime"],
                "actual": a["generation"],
                "forecast": latest["generation"]
            })

    return filtered