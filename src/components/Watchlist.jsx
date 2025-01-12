import React from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const Watchlist = ({ stocks, onRemoveStock, onSelectStock }) => {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Watchlist
      </Typography>
      {stocks.length === 0 ? (
        <Typography color="text.secondary">
          No stocks in watchlist. Search and add stocks to track them.
        </Typography>
      ) : (
        <List>
          {stocks.map((stock) => (
            <ListItem
              key={stock.symbol}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onRemoveStock(stock.symbol)}
                >
                  <DeleteIcon />
                </IconButton>
              }
              sx={{
                cursor: "pointer",
                "&:hover": { bgcolor: "action.hover" },
              }}
              onClick={() => onSelectStock(stock.symbol)}
            >
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="subtitle1">{stock.symbol}</Typography>
                    <Chip
                      icon={
                        stock.trend.direction === "uptrend" ? (
                          <TrendingUpIcon fontSize="small" />
                        ) : (
                          <TrendingDownIcon fontSize="small" />
                        )
                      }
                      label={`${stock.trend.percentage}%`}
                      color={
                        stock.trend.direction === "uptrend"
                          ? "success"
                          : "error"
                      }
                      size="small"
                    />
                  </Box>
                }
                secondary={`Last updated: ${new Date(
                  stock.lastUpdated
                ).toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default Watchlist;
