from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Wind Forecast Monitoring API is running"}