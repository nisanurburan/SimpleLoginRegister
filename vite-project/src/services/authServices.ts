import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

export async function login({ email, password }: { email: string; password: string }) {
  const response = await axios.post(`${API_BASE}/auth/login`, {
    Email: email,
    Password: password,
  });

  const token = response.data.Token;
  const expiresAt = response.data.ExpiresAt;

  localStorage.setItem("token", token);
  localStorage.setItem("expiresAt", expiresAt);

  return response.data;
}

export async function register(UserName: string, Password: string, Email: string) {
  const response = await axios.post(`${API_BASE}/auth/register`, {
    UserName,
    Password,
    Email
  });

  return response.data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiresAt");  // Bunu ekle
}

export function getToken() {
  return localStorage.getItem("token");
}