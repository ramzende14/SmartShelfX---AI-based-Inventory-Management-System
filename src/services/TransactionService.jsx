import axios from "./axiosInstance";

export const stockIn = (productId, quantity, userId) =>
  axios.post("/stock/in", null, {
    params: { productId, quantity, userId },
  });

export const stockOut = (productId, quantity, userId) =>
  axios.post("/stock/out", null, {
    params: { productId, quantity, userId },
  });

export const getTransactions = () =>
  axios.get("/stock/transactions");

// 🔥 SALES ANALYTICS
export const getProductWiseTotalSale = () =>
  axios.get("/analytics/product-sales");
