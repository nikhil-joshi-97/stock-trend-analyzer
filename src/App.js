import React, { useState, useEffect } from "react";
import { Container, Paper, Typography, Grid, Snackbar } from "@mui/material";
import SearchBarAutocomplete from "./components/SearchBarAutocomplete";
import StockChart from "./components/StockChart";
import TrendAlert from "./components/TrendAlert";
import Watchlist from "./components/Watchlist";
import NewsComponent from "./components/StockNews";
import TopGainers from "./components/IpoList";
import TopLosers from "./components/MarketStatus";
import {
  calculateTrend,
  formatStockData,
  setupNotifications,
  sendNotification,
} from "./utils/stockUtils";
import { fetchStockData } from "./api/stockApi";
import { Analytics } from "@vercel/analytics/react"

function App() {
  const [stockSymbol, setStockSymbol] = useState("");
  const [stockData, setStockData] = useState(null);
  const [trend, setTrend] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  useEffect(() => {
    setupNotifications();
    // Update watchlist stocks periodically
    const interval = setInterval(updateWatchlistStocks, 600000); // Every 10 minutes
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const updateWatchlistStocks = async () => {
    const updatedWatchlist = await Promise.all(
      watchlist.map(async (stock) => {
        try {
          const data = await fetchStockData(stock.symbol);
          const formattedData = formatStockData(data);
          const newTrend = calculateTrend(formattedData);

          return {
            ...stock,
            trend: newTrend,
            lastUpdated: new Date().toISOString(),
          };
        } catch (error) {
          console.error(`Error updating ${stock.symbol}:`, error);
          return stock;
        }
      })
    );

    setWatchlist(updatedWatchlist);
  };

  const handleSearch = async (symbol) => {
    if (!symbol) return;

    setStockSymbol(symbol);
    setLoading(true);
    setError(null);

    try {
      const data = await fetchStockData(symbol);
      const formattedData = formatStockData(data);
      setStockData(formattedData);
      const newTrend = calculateTrend(formattedData);
      setTrend(newTrend);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addToWatchlist = () => {
    if (!stockSymbol || !trend) return;

    if (!watchlist.some((stock) => stock.symbol === stockSymbol)) {
      const newStock = {
        symbol: stockSymbol,
        trend,
        lastUpdated: new Date().toISOString(),
      };

      setWatchlist((prevWatchlist) => [...prevWatchlist, newStock]);
      setSnackbar({
        open: true,
        message: `${stockSymbol} added to watchlist`,
      });
    }
  };

  const removeFromWatchlist = (symbol) => {
    setWatchlist((prevWatchlist) =>
      prevWatchlist.filter((stock) => stock.symbol !== symbol)
    );
    setSnackbar({
      open: true,
      message: `${symbol} removed from watchlist`,
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const isInWatchlist =
    stockSymbol && watchlist.some((stock) => stock.symbol === stockSymbol);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Analytics />
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Stock Trend Analyzer
            </Typography>

            <SearchBarAutocomplete
              onStockSelect={handleSearch}
              loading={loading}
            />

            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}

            {trend && (
              <TrendAlert
                trend={trend}
                symbol={stockSymbol}
                onAddToWatchlist={addToWatchlist}
                isInWatchlist={isInWatchlist}
              />
            )}
            <StockChart data={stockData} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Watchlist
            stocks={watchlist}
            onRemoveStock={removeFromWatchlist}
            onSelectStock={handleSearch}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <NewsComponent/>
        </Grid>
        <Grid item xs={12} md={4}>
          <TopGainers/>
        </Grid>
        <Grid item xs={12} md={4}>
          <TopLosers/>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbar.message}
      />
    </Container>
  );
}

export default App;
