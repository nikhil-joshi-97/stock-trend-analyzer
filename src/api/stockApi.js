const POLYGON_API_KEY = process.env.REACT_APP_POLYGON_API_KEY;

export const fetchStockData = async (symbol) => {
  const today = new Date();
  const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));

  const response = await fetch(
    `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${
      thirtyDaysAgo.toISOString().split("T")[0]
    }/${new Date().toISOString().split("T")[0]}?apiKey=${POLYGON_API_KEY}`
  );

  const data = await response.json();

  if (!data.results) {
    throw new Error("No data available for this stock symbol");
  }

  return data.results;
};

export const searchStocks = async (query) => {
  const response = await fetch(
    `https://api.polygon.io/v3/reference/tickers?search=${query}&market=stocks&active=true&apiKey=${POLYGON_API_KEY}`
  );

  const data = await response.json();

  if (!data.results) {
    return [];
  }

  return data.results.map((stock) => ({
    symbol: stock.ticker,
    name: stock.name,
    market: stock.market,
    currency: stock.currency_name,
  }));
};
