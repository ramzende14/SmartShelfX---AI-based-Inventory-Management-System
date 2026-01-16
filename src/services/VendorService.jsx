// src/services/VendorService.js
import axios from "./axiosInstance";

// GET ALL VENDORS
export const getAllVendors = () =>
  axios.get("/vendors");
