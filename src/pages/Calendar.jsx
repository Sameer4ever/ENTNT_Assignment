// src/pages/Calendar.jsx
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { getData } from '../utils/localStorageHelpers';

function Calendar() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const incidents = getData('incidents') || [];
    setAppointments(incidents);
  }, []);

  const handleDateClick = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    const sameDay = appointments.filter(a =>
      a.appointmentDate?.startsWith(date)
    );
    setFiltered(sameDay);
  };

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">🗓️ Calendar View</h2>

      <div className="bg-white p-4 rounded shadow mb-6">
        <label className="block text-gray-700 mb-2 font-medium">Pick a Date:</label>
        <input type="date" onChange={handleDateClick} className="input w-full max-w-xs" />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Appointments on {selectedDate || '...'}</h3>
        {filtered.length === 0 ? (
          <p className="text-gray-500">No appointments for this date.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            {filtered.map((a) => (
              <li key={a.id}>
                <strong>{a.title}</strong> with patient ID {a.patientId} at {new Date(a.appointmentDate).toLocaleTimeString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Calendar;
