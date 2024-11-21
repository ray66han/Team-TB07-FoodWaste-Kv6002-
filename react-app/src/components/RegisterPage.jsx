import React, { useState } from 'react';
import Footer from './Footer';

function RegisterPage() {

  return (
    <>
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome Back</h1>
        <p>Please Register to continue</p>
        </div>
    </div>

    {/* --------------------------------------------Footer Section Start Here-------------------------------------------- */} 
    <Footer />  {/* Include Footer here */}
    </>
  );
}

export default LoginPage;