import axios from "axios";
const SKU_URL = "http://localhost:8080/invent/sku";

export const saveSKU = (sku) => axios.post(SKU_URL, sku);

export const getAllSKUs = () => axios.get(SKU_URL);

export const getSKUById = (id) => axios.get(`${SKU_URL}/${id}`);

export const deleteSKUById = (id) => axios.delete(`${SKU_URL}/${id}`);

export const updateSKU = (sku) => axios.put(SKU_URL, sku);
