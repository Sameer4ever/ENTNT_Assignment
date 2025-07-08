import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './login.css';

function Signin() {
  const [email, setEmail] = useState("username");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate("/");
    } else {
      setError("❌ Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login">
      <h4>Login</h4>
      <form onSubmit={handleSubmit}>
        <div className="text_area">
          <input
            type="text"
            id="username"
            name="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text_input"
          />
        </div>
        <div className="text_area">
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text_input"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <input
          type="submit"
          value="LOGIN"
          className="btn"
        />
      </form>
      <a className="link" href="/signup">Sign Up</a>
    </div>
  );
}

export default Signin;
