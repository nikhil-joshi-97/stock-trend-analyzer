import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  Box,
} from "@mui/material";

const MarketStatus = () => {
  const [marketStatus, setMarketStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarketStatus = async () => {
      try {
        const response = await axios.get(
          "https://api.polygon.io/v1/marketstatus/now",
          {
            params: {
              apiKey: process.env.REACT_APP_POLYGON_API_KEY,
            },
          }
        );

        setMarketStatus(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching market status");
        setLoading(false);
      }
    };

    fetchMarketStatus();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={8} md={6}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h4" component="h2" gutterBottom>
              Market Status
            </Typography>
            <Typography variant="body1">
              <strong>
                Crypto:
                {String(marketStatus.currencies.crypto).toLocaleUpperCase()}
              </strong>
            </Typography>
            <Typography variant="body1">
              <strong>
                Forex:{String(marketStatus.currencies.fx).toLocaleUpperCase()}
              </strong>
            </Typography>
            <Typography variant="body1">
              <strong>
                NASDAQ:
                {String(marketStatus.exchanges.nasdaq).toLocaleUpperCase()}
              </strong>
            </Typography>
            <Typography variant="body1">
              <strong>
                NYSE:{String(marketStatus.exchanges.nyse).toLocaleUpperCase()}
              </strong>
            </Typography>
            <Typography variant="body1">
              <strong>
                OTC:{String(marketStatus.exchanges.otc).toLocaleUpperCase()}
              </strong>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MarketStatus;
