import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from './Footer'; 
import './styles/ForgotPasswordPage.css'; 

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Display message to the user
    alert(`Password reset link sent to: ${email}`);

    // Redirect to login page after form submission
    navigate("/login");
  };

  return (
    <>
      <div className="forgot-password-page">
        <div className="form-container">
          <h1>Forgot Password</h1>
          <p>Enter your email address to receive a password reset link</p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>

          <div className="login-link">
            <p>Remembered your password? <a href="/login">Login</a></p>
          </div>
        </div>
      </div>
      <Footer /> 
    </>
  );
}

export default ForgotPasswordPage;