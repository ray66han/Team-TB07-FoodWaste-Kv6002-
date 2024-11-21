import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./styles/LoginPage.css";
import Footer from './Footer';

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    const hardcodedUsername = "expiryalertUser01";
    const hardcodedPassword = "123456Gh@!";

    if (username === hardcodedUsername && password === hardcodedPassword) {
      navigate("/fridge");
    } else {
      alert("Invalid username or password. Please try again.");
    }
  }

  return (
    <>
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome Back</h1>
        <p>Please log in to continue</p>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <div className="options">
          <a href="#" className="forgot-password">
            Forgot Password?
          </a>
        </div>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        <div className="register">
          Don’t have an account? <a href="#">Register</a>
        </div>
      </div>
    </div>

    {/* --------------------------------------------Footer Section Start Here-------------------------------------------- */} 
    <Footer />  {/* Include Footer here */}
    </>
  );
}

export default LoginPage;