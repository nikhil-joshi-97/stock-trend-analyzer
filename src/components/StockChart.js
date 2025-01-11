import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Paper } from "@mui/material";

const StockChart = ({ data }) => {
  if (!data) return null;

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <LineChart width={600} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="close"
          stroke="#8884d8"
          name="Stock Price"
        />
      </LineChart>
    </Paper>
  );
};

export default StockChart;
