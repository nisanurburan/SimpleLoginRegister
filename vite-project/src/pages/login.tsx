import { useState } from "react";
import { login } from "../services/authServices";
import {useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(""); 
  try {
    await login({ email: Email, password: Password }); // burada zaten localStorage'a kaydediliyor
    navigate("/home"); 
  } catch (err) {
    setError("Email or password is incorrect.");
  }
};

  return (
    <>
    
      <style>{`
        .login-form {
          max-width: 400px;
          margin: 80px auto;
          padding: 30px;
          background-color: #f4f4f4;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .login-form h2 {
          text-align: center;
          margin-bottom: 24px;
          color: #333;
        }

        .login-form input {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px;
        }

        .login-form button {
          width: 100%;
          padding: 12px;
          background-color: #007BFF;
          color: white;
          font-weight: bold;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
        }

        .login-form button:hover {
          background-color: #0056b3;
        }

        .login-form p {
          text-align: center;
          margin-top: 12px;
          color: #333;
        }

        .login-form a {
          color: #007BFF;
          text-decoration: none;
        }

        .login-form a:hover {
          text-decoration: underline;
        }

        .login-form p.error {
          color: red;
          margin-bottom: 10px;
          font-weight: bold;
        }
      `}</style>

      <form onSubmit={handleLogin} className="login-form">
        <h2>Log in</h2>
        {error && <p className="error">{error}</p>}
        <input
          value={Email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={Password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign in</button>

        <p>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </>
  );
}
