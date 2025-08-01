import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

export const login = async (userData: { username: string; password: string }) => {
  const response = await axios.post(`${API}/auth/login`, userData);

  return response.data;
};
