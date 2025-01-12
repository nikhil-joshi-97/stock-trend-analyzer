import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import axios from "axios";

const UpcomingIPOs = () => {
  const [ipos, setIpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_KEY = process.env.REACT_APP_POLYGON_API_KEY;
  const IPO_ENDPOINT = "https://api.polygon.io/vX/reference/ipos";

  useEffect(() => {
    const fetchIpos = async () => {
      try {
        const response = await axios.get(IPO_ENDPOINT, {
          params: { apiKey: API_KEY },
        });
        const upcomingIpos = response.data.results;
        setIpos(upcomingIpos.slice(0, 5));
        setLoading(false);
      } catch (err) {
        setError("Failed to load upcoming IPOs. Please try again later.");
        setLoading(false);
      }
    };
    fetchIpos();
  }, [API_KEY]);

  if (loading) return <Typography>Loading Upcoming IPOs...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        IPOs
      </Typography>
      <Grid container spacing={2}>
        {ipos.length === 0 ? (
          <Typography>No upcoming IPOs available.</Typography>
        ) : (
          ipos.map((ipo) => (
            <Grid item xs={12} sm={6} md={12} key={ipo.ticker}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">{ipo.issuer_name}</Typography>
                  <Typography>
                    Status:{" "}
                    {String(ipo.ipo_status ?? "UNKNOWN").toLocaleUpperCase()}
                  </Typography>
                  <Typography>Lot size: {ipo.lot_size ?? "UNKNOWN"}</Typography>
                  <Typography>
                    Max shares offered: {ipo.max_shares_offered ?? "UNKNOWN"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default UpcomingIPOs;
