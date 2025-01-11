import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Paper } from "@mui/material";

const StockChart = ({ data }) => {
  if (!data) return null;

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
        >
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
      </ResponsiveContainer>
    </Paper>
  );
};

export default StockChart;
