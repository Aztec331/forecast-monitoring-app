# Wind Forecast Monitoring Application

## Overview

This project is a **Full Stack Wind Forecast Monitoring Application** that analyzes the accuracy of wind power forecasts and visualizes the difference between **actual wind generation** and **forecasted wind generation**.

The application fetches wind power data from the **BMRS (Elexon) datasets**, processes the data using a **FastAPI backend**, and displays the results in an **interactive React + Chart.js dashboard**.

Additionally, a **Jupyter Notebook analysis** is included to evaluate forecast accuracy using statistical metrics and visualizations.

---

# Project Architecture

Frontend (React + Vite + Chart.js)

↓

FastAPI Backend (Python)

↓

BMRS Data APIs

↓

Jupyter Notebook Analysis (Pandas, Matplotlib, Seaborn)

---

# Live Application

Frontend (Vercel):

https://forecast-monitoring-app-mocha.vercel.app/

Backend API (Render):

https://forecast-monitoring-api.onrender.com

API Documentation:

https://forecast-monitoring-api.onrender.com/docs

---

# Project Structure

```
forecast-monitoring-app
│
├── client
│   ├── src
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server
│   ├── main.py
│   └── requirements.txt
│
├── analysis
│   └── forecast_analysis.ipynb
│
└── README.md
```

### client

Contains the **React frontend application**.

Responsibilities:

* Render wind forecast chart
* Allow user to select start time and end time
* Allow user to adjust forecast horizon
* Fetch data from FastAPI backend

Libraries used:

* React
* Vite
* Chart.js

---

### server

Contains the **FastAPI backend service**.

Responsibilities:

* Fetch wind generation data from BMRS datasets
* Implement forecast horizon filtering logic
* Return processed data to frontend

Libraries used:

* FastAPI
* Uvicorn
* Requests
* Pandas

---

### analysis

Contains the **Jupyter Notebook for forecast analysis**.

The notebook performs:

* Data loading
* Data cleaning
* Forecast error calculation
* Error statistics (Mean, Median, P99)
* Error distribution visualization
* Error vs time-of-day analysis
* Reliable wind generation estimation

Libraries used:

* Pandas
* NumPy
* Matplotlib
* Seaborn

---

# Features

* Compare **Actual vs Forecast wind generation**
* Interactive **line chart visualization**
* Select **custom time range**
* Adjustable **forecast horizon (0–48 hours)**
* Forecast error analysis
* Data visualization and statistical evaluation

---

# Forecast Horizon Logic

For a given **target time (T)** and **forecast horizon (H)**:

The system selects the **latest forecast that was created before (T − H hours)**.

Example:

Target Time = 18:00
Horizon = 4 hours

The selected forecast must have been created **before 14:00**.

---

# How to Run the Application

## 1. Clone the Repository

```
git clone https://github.com/Aztec331/forecast-monitoring-app.git
cd forecast-monitoring-app
```

---

# Running the Backend

Navigate to the server folder:

```
cd server
```

Install dependencies:

```
pip install fastapi uvicorn requests pandas
```

Start the FastAPI server:

```
uvicorn main:app --reload
```

Backend will run at:

```
http://127.0.0.1:8000
```

API documentation:

```
http://127.0.0.1:8000/docs
```

---

# Running the Frontend

Navigate to the client folder:

```
cd client
```

Install dependencies:

```
npm install
```

Start the React development server:

```
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

# Running the Analysis Notebook

Navigate to the analysis folder:

```
cd analysis
```

Start Jupyter Notebook:

```
jupyter notebook
```

Open:

```
forecast_analysis.ipynb
```

Run cells sequentially to perform the analysis.

---

# Forecast Error Analysis

Forecast accuracy is evaluated using:

Mean Error
Median Error
P99 Error

Additional analysis includes:

* Error distribution visualization
* Error vs time-of-day patterns
* Reliable wind generation estimation using percentiles

Reliable wind generation is estimated using the **P10 percentile**, representing wind generation exceeded **90% of the time**.

---

# Technologies Used

Frontend:

* React
* Vite
* Chart.js

Backend:

* FastAPI
* Uvicorn
* Requests
* Pandas

Analysis:

* Pandas
* NumPy
* Matplotlib
* Seaborn

Deployment:

* Vercel
* Render

---

# Demo

Demo Video:

https://youtu.be/Ul8t4DZGbpY

---

# Author

Name: Aztec(Aditya Babar)
