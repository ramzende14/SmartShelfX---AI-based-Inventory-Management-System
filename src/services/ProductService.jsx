import axios from "./axiosInstance";

// baseURL = http://localhost:8080/invent

export const saveProduct = (product) =>
  axios.post("/products", product);

export const getAllProducts = () =>
  axios.get("/products");

export const getProductById = (id) =>
  axios.get(`/products/${id}`);

export const deleteProductById = (id) =>
  axios.delete(`/products/${id}`);

export const updateProduct = (product) =>
  axios.put("/products", product);

export const getNextProductId = () =>
  axios.get("/products/next-id");
