import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

export const login = async (userData: { email: string; password: string }) => {
  const response = await axios.post(`${API}/auth/login`, userData);

  const { token, expiresAt } = response.data;

  localStorage.setItem("token", token);
  localStorage.setItem("expiresAt", expiresAt); // It should come from the backend as DateTime

  return response.data;
};
