// src/services/UserService.js
import axios from "axios";

const API_URL = "http://localhost:8080/invent";

export const getAllVendors = async () => {
  const res = await axios.get(`${API_URL}/users`);

  return {
    data: res.data.filter(
      (user) => user.role && user.role.toUpperCase() === "VENDOR"
    ),
  };
};
