import axios from "./axiosInstance";

export const createPO = (productId, vendorId, quantity) =>
  axios.post("/purchase-orders/create", null, {
    params: { productId, vendorId, quantity },
  });

export const getVendorPOs = (vendorId) =>
  axios.get(`/purchase-orders/vendor/${vendorId}`);

export const getAllPOs = () =>
  axios.get("/purchase-orders/all");

export const approvePO = (poId) =>
  axios.put(`/purchase-orders/${poId}/approve`);

export const rejectPO = (poId, reason) =>
  axios.put(`/purchase-orders/${poId}/reject`, null, {
    params: { reason },
  });

export const dispatchPO = (poId) =>
  axios.put(`/purchase-orders/${poId}/dispatch`);

/* 🔥 COMPLETE = AUTO STOCK IN */
export const completePO = (poId) =>
  axios.put(`/purchase-orders/${poId}/complete`);

export const deletePO = (poId) =>
  axios.delete(`/purchase-orders/${poId}`);

export const getPOById = (poId) =>
  axios.get(`/purchase-orders/${poId}`);

export const updatePO = (poId, data) =>
  axios.put(`/purchase-orders/${poId}`, data);
