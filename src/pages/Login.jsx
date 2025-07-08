// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

 const handleSubmit = (e) => {
  e.preventDefault();
  const success = login(email, password);

  if (success) {
    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log("Logged in as:", user);

      if (user?.role === "Admin") {
        navigate('/');
      } else if (user?.role === "Patient") {
        navigate('/myprofile');
      } else {
        setError("Unknown user role.");
      }
    }, 200);
  } else {
    setError("Invalid credentials. Please try again.");
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-tr from-white to-indigo-300 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-[90%] max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-full border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-indigo-300"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-full border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-indigo-300"
            required
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 text-white font-semibold shadow-md hover:shadow-lg transition ${loading && 'opacity-50 cursor-not-allowed'}`}
          >
            {loading ? 'Logging in...' : 'LOGIN'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
