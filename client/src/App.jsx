import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

function App() {

  const [startTime, setStartTime] = useState("2024-01-01T00:00");
  const [endTime, setEndTime] = useState("2024-01-07T23:30");
  const [horizon, setHorizon] = useState(4);

  const [chartData, setChartData] = useState(null);

  const fetchData = () => {

    const start = new Date(startTime).toISOString();
    const end = new Date(endTime).toISOString();

    fetch(`http://127.0.0.1:8000/wind-data?start=${start}&end=${end}&horizon=${horizon}`)
      .then(res => res.json())
      .then(data => {

        const labels = data.map(d => {

          const date = new Date(d.time);

          const time = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          });

          const day = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit"
          });

          return [time, day];

        });

        const actual = data.map(d => d.actual);
        const forecast = data.map(d => d.forecast);

        setChartData({
          labels,
          datasets: [
            {
              label: "Actual Generation",
              data: actual,
              borderColor: "blue",
              tension: 0.3,
              pointRadius: 0
            },
            {
              label: "Forecast Generation",
              data: forecast,
              borderColor: "green",
              tension: 0.3,
              pointRadius: 0
            }
          ]
        });

      });

  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top"
      }
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 8,
          autoSkip: true,
          maxRotation: 0,
          minRotation: 0
        },
        title: {
          display: true,
          text: "Target Time End (UTC)"
        }
      },
      y: {
        title: {
          display: true,
          text: "Wind Generation (MW)"
        }
      }
    }
  };

  return (

    <div
      style={{
        width: "90%",
        maxWidth: "1200px",
        margin: "40px auto",
        textAlign: "center"
      }}
    >

      <h2>Wind Forecast Monitoring</h2>

      {/* Controls */}

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "30px",
        gap: "20px"
      }}>

        <div>
          <label>Start Time</label><br/>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div>
          <label>End Time</label><br/>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        <div style={{width:"300px"}}>
          <label>Forecast Horizon: {horizon}h</label><br/>
          <input
            type="range"
            min="0"
            max="48"
            value={horizon}
            onChange={(e) => setHorizon(e.target.value)}
            style={{width:"100%"}}
          />
        </div>

        <button onClick={fetchData}>
          Update Chart
        </button>

      </div>

      {/* Chart */}

      <div style={{height:"500px"}}>
        {chartData && <Line data={chartData} options={options} />}
      </div>

    </div>

  );

}

export default App;