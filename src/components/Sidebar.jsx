// Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, ClipboardList, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Sidebar() {
  const { user, logout } = useAuth();

  const adminNavItems = [
    { label: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { label: 'Patients', path: '/patients', icon: <Users size={20} /> },
    { label: 'Incidents', path: '/incidents', icon: <ClipboardList size={20} /> },
  ];

  const patientNavItems = [
    { label: 'My Appointments', path: '/myprofile', icon: <User size={20} /> },
  ];

  const navItems = user?.role === 'Admin' ? adminNavItems : patientNavItems;

  return (
    <aside className="w-64 bg-white shadow h-screen sticky top-0 p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-6 text-blue-600">ENTNT Dental</h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.label}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 ${
                  isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <button
        onClick={logout}
        className="flex items-center gap-2 mt-8 text-red-500 hover:underline text-sm"
      >
        <LogOut size={16} />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
