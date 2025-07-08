import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
