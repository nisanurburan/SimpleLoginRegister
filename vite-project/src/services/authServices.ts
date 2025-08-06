import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function login({ identifier, password }: { identifier: string; password: string }) {
  const isEmail = identifier.includes("@");

  const data = isEmail
    ? { Email: identifier, Password: password }
    : { UserName: identifier, Password: password };

  const response = await axios.post(`${API_BASE}/auth/login`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const token = response.data.Token;
  const expiresAt = response.data.ExpiresAt;

  localStorage.setItem("token", token);
  localStorage.setItem("expiresAt", expiresAt);

  return response.data;
}

export async function register(userName: string, password: string, email: string) {
  const data = {
    UserName: userName,
    Password: password,
    Email: email
  };

  const response = await axios.post(`${API_BASE}/auth/register`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiresAt"); 
}

export function getToken() {
  return localStorage.getItem("token");
}
