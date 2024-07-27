import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDailyRevenue,
  fetchWeeklyRevenue,
  fetchMonthlyRevenue,
} from "../state/revenueSlice";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { Button } from "@mui/material";
import { Chart, registerables } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import "../index.css";
Chart.register(...registerables, zoomPlugin);

const RevenueChart = () => {
  const dispatch = useDispatch();
  const dailyRevenue = useSelector((state) => state.revenue.daily);
  const weeklyRevenue = useSelector((state) => state.revenue.weekly);
  const monthlyRevenue = useSelector((state) => state.revenue.monthly);
  const status = useSelector((state) => state.revenue.status);
  const error = useSelector((state) => state.revenue.error);

  const [data, setData] = useState([]);
  const [period, setPeriod] = useState("daily");

  useEffect(() => {
    dispatch(fetchDailyRevenue());
    dispatch(fetchWeeklyRevenue());
    dispatch(fetchMonthlyRevenue());
  }, [dispatch]);

  useEffect(() => {
    if (period === "daily") {
      setData(dailyRevenue);
    } else if (period === "weekly") {
      setData(weeklyRevenue);
    } else if (period === "monthly") {
      setData(monthlyRevenue);
    }
  }, [period, dailyRevenue, weeklyRevenue, monthlyRevenue]);

  const chartData = {
    labels: data.map((entry) => {
      if (period === "daily") {
        return new Date(entry.day);
      } else if (period === "weekly") {
        return new Date(entry.week);
      } else if (period === "monthly") {
        return new Date(entry.month);
      }
      return null;
    }),
    datasets: [
      {
        label: "Revenue",
        data: data.map((entry) => parseFloat(entry.total_revenue)),
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit:
            period === "daily" ? "day" : period === "weekly" ? "week" : "month",
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: "xy",
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
      },
    },
  };

  return (
    <div className="border p-4 rounded-lg shadow-md" style={{ width: '650px' }}>
      <div className="flex justify-center gap-3 mb-4">
        <Button className="btn btn-accent btn-sm" onClick={() => setPeriod("daily")}>Daily</Button>
        <Button className="btn btn-accent btn-sm" onClick={() => setPeriod("weekly")}>Weekly</Button>
        <Button className="btn btn-accent btn-sm" onClick={() => setPeriod("monthly")}>Monthly</Button>
      </div>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <div className="">
          <div style={{ width: '600px', height: '400px' }}>
            <Line data={chartData} options={options} />
            </div>
          </div>
        )}
    </div>
  );
};

export default RevenueChart;
