import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      alert('Login successful!');
    } else {
      alert('Invalid credentials.');
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome Back</h2>
      <p>Login to access your farm equipment rental dashboard</p>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <a href="#" className="forgot-password">Forgot Password?</a>
        <button type="submit" className="login-button">Login</button>
      </form>
      <div className="social-login">
        <p>Or continue with</p>
        <div className="social-icons">
          <i className="fab fa-google"></i>
          <i className="fab fa-facebook"></i>
        </div>
      </div>
      <p className="register-link">Don't have an account? <a href="/register">Register here</a></p>
    </div>
  );
};

export default Login;
