export const calculateTrend = (data) => {
  if (!data || data.length < 2) return null;

  const firstPrice = data[0].close;
  const lastPrice = data[data.length - 1].close;
  const percentageChange = ((lastPrice - firstPrice) / firstPrice) * 100;

  return {
    direction: percentageChange >= 0 ? "uptrend" : "downtrend",
    percentage: Math.abs(percentageChange).toFixed(2),
  };
};

export const formatStockData = (data) => {
  return data.map((item) => ({
    date: new Date(item.t).toLocaleDateString(),
    close: item.c,
  }));
};

export const setupNotifications = async () => {
  if (Notification.permission !== "granted") {
    return await Notification.requestPermission();
  }
  return Notification.permission;
};

export const sendNotification = (symbol, trend) => {
  if (Notification.permission === "granted") {
    new Notification(`${symbol} Trend Alert`, {
      body: `Current trend is ${trend.direction} (${trend.percentage}%)`,
      icon: "/favicon.ico",
    });
  }
};
