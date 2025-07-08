import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { getData } from '../utils/localStorageHelpers';

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    setPatients(getData('patients') || []);
    setIncidents(getData('incidents') || []);
  }, []);

  const totalRevenue = incidents.reduce((sum, i) => sum + Number(i.cost || 0), 0);
  const today = new Date().toISOString().split('T')[0];
  const upcomingToday = incidents.filter(i => i.appointmentDate?.startsWith(today));

  const topPatients = patients
    .map(p => ({
      ...p,
      count: incidents.filter(i => i.patientId === p.id).length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <DashboardLayout>
      <div className="p-4 space-y-6">

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-sm text-gray-500">Total Patients</h4>
            <p className="text-2xl font-bold text-blue-700">{patients.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-sm text-gray-500">Appointments</h4>
            <p className="text-2xl font-bold text-indigo-700">{incidents.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-sm text-gray-500">Total Revenue</h4>
            <p className="text-2xl font-bold text-green-600">₹{totalRevenue}</p>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">🗓️ Appointments Today</h3>
          {upcomingToday.length === 0 ? (
            <p className="text-gray-500">No appointments today.</p>
          ) : (
            <ul className="space-y-2">
              {upcomingToday.map(a => {
                const patient = patients.find(p => p.id === a.patientId);
                return (
                  <li key={a.id} className="flex justify-between text-sm text-gray-700 border-b pb-1">
                    <span>{new Date(a.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span>{patient?.name || 'Unknown Patient'}</span>
                    <span className="italic">{a.title}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Top Patients */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">🏆 Top Patients</h3>
          {topPatients.length === 0 ? (
            <p className="text-gray-500">No patient records yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-left text-gray-500 border-b">
                <tr>
                  <th>Name</th>
                  <th>Visits</th>
                  <th>DOB</th>
                </tr>
              </thead>
              <tbody>
                {topPatients.map(p => (
                  <tr key={p.id} className="border-b">
                    <td className="py-1">{p.name}</td>
                    <td>{p.count}</td>
                    <td>{p.dob}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
