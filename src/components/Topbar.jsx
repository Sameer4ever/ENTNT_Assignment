// Topbar.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

function Topbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-800">Dashboard Overview</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{user?.email}</span>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Topbar;