import axios from "axios";

const BASE_URL = "http://localhost:8080/invent";

// REGISTER
export const registerNewUser = (user) => {
  return axios.post(`${BASE_URL}/register`, user);
};

// LOGIN (POST)
export const validateUser = async (username, password) => {
  const res = await axios.post(`${BASE_URL}/login`, {
    username,
    password
  });

  const { userId, role } = res.data;

  const cleanRole = role.toUpperCase().replace("ROLE_", "");

  localStorage.setItem("userId", userId);
  localStorage.setItem("role", cleanRole);
  localStorage.setItem("username", username);

  return cleanRole;
};

// GET ROLE
export const getRole = () => {
  const role = localStorage.getItem("role");
  if (role) return Promise.resolve(role);

  return Promise.reject("Not logged in");
};
