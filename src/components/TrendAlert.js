import React from "react";
import { Alert, AlertTitle, Button, Box } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";

const TrendAlert = ({ trend, symbol, onAddToWatchlist, isInWatchlist }) => {
  if (!trend) return null;

  return (
    <Alert
      severity={trend.direction === "uptrend" ? "success" : "error"}
      icon={
        trend.direction === "uptrend" ? (
          <TrendingUpIcon />
        ) : (
          <TrendingDownIcon />
        )
      }
      sx={{ mt: 2 }}
      action={
        <Button
          color={isInWatchlist ? "success" : "primary"}
          variant="contained"
          size="small"
          onClick={onAddToWatchlist}
          disabled={isInWatchlist}
          startIcon={isInWatchlist ? <CheckIcon /> : <AddIcon />}
        >
          {isInWatchlist ? "Added" : "Add to Watchlist"}
        </Button>
      }
    >
      <AlertTitle>{trend.direction.toUpperCase()}</AlertTitle>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>Price change: {trend.percentage}%</span>
      </Box>
    </Alert>
  );
};

export default TrendAlert;
