import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { searchStocks } from "../api/stockApi";

const SearchBarAutocomplete = ({ onStockSelect, loading }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    let active = true;

    const fetchSuggestions = async () => {
      if (searchText.length < 2) return;
      setSearchLoading(true);

      try {
        const results = await searchStocks(searchText);
        if (active) {
          setOptions(results);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setOptions([]);
      } finally {
        setSearchLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => {
      active = false;
      clearTimeout(debounceTimer);
    };
  }, [searchText]);

  return (
    <Autocomplete
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onChange={(event, newValue) => {
        if (newValue) {
          onStockSelect(newValue.symbol);
        }
      }}
      isOptionEqualToValue={(option, value) => option.symbol === value.symbol}
      getOptionLabel={(option) => `${option.symbol} - ${option.name}`}
      options={options}
      loading={loading || searchLoading}
      filterOptions={(x) => x}
      onInputChange={(event, value) => setSearchText(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search US stocks"
          placeholder="Enter stock symbol or name"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading || searchLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default SearchBarAutocomplete;
