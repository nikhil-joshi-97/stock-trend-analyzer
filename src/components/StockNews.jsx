import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Paper,
} from "@mui/material";

const NewsComponent = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_KEY = process.env.REACT_APP_POLYGON_API_KEY;
  const NEWS_ENDPOINT = "https://api.polygon.io/v2/reference/news";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(NEWS_ENDPOINT, {
          params: {
            apiKey: API_KEY,
            limit: 25,
          },
        });

        setNews(response.data.results);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news. Please try again later.");
        setLoading(false);
      }
    };

    fetchNews();
  }, [API_KEY]);

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Latest News
      </Typography>
      <Paper
        elevation={3}
        sx={{ maxHeight: 500, overflow: "auto", padding: 2 }}
      >
        {news.map((article) => (
          <Card key={article.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {article.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {article.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                href={article.article_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more
              </Button>
            </CardActions>
          </Card>
        ))}
      </Paper>
    </Box>
  );
};

export default NewsComponent;
