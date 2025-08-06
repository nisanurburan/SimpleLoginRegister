import React, { useState } from "react";
import { register } from "../services/authServices";
import { Link } from "react-router-dom";

function isPasswordValid(password: string): boolean {
  return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>/?]).{8,}$/.test(password);
}

export default function Register() {
  const [UserName, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState<string>("");


  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setMessage("");

  if (!UserName.trim()) {
    setError("Username is required.");
    return;
  }

  if (!Email.trim()) {
    setError("Email is required.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(Email)) {
    setError("Invalid email format.");
    return;
  }

  if (!isPasswordValid(Password)) {
    setError("Your password must contain at least one uppercase letter, number, special character, and be at least 8 characters long.");
    return;
  }

  try {
    await register(UserName, Password, Email);
    setMessage("Registration successful!");
    setError("");
    setUsername("");
    setPassword("");
    setEmail("");
  } catch (err: any) {
    setError(err.response?.data?.message || err.message || "Registration failed.");
    setMessage("");
  }
};

  return (
    <>

      <style>{`
        .register-form {
          max-width: 400px;
          margin: 80px auto;
          padding: 30px;
          background-color: #f4f4f4;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .register-form h2 {
          text-align: center;
          margin-bottom: 24px;
          color: #333;
        }
        .success-message {
        color: green;
        font-weight: bold;
        text-align: center;
        margin-bottom: 10px;
        font-size: 18px;
        }
        .register-form input {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px;
        }

        .register-form button {
          width: 100%;
          padding: 12px;
          background-color: #28a745;
          color: white;
          font-weight: bold;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
        }

        .register-form button:hover {
          background-color: #218838;
        }

        .register-form p {
          text-align: center;
          margin-top: 12px;
          color: #333;
        }

        .register-form a {
          color: #007BFF;
          text-decoration: none;
        }

        .register-form a:hover {
          text-decoration: underline;
        }

        .register-form p.error {
          color: red;
          margin-bottom: 10px;
          font-weight: bold;
        }
      `}</style>

      <form onSubmit={handleRegister} className="register-form">
        <h2>Sign up</h2>
        {error && <p className="error">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <input
          value={UserName}
          onChange={e => setUsername(e.target.value)}
          placeholder="UserName"
        />
        <input
         value={Email} 
         onChange={e => setEmail(e.target.value)} 
        placeholder="Email"
        type="Email"
        />
        <input
          type="password"
          value={Password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign up</button>

        <p>
          Do you already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </>
  );
}
