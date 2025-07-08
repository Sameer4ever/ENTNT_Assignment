// src/pages/PatientView.jsx
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { getData, setData } from '../utils/localStorageHelpers';
import { useAuth } from '../context/AuthContext';
import { v4 as uuid } from 'uuid';

function PatientView() {
  const { user } = useAuth();
  const [incidents, setIncidents] = useState([]);
  const [form, setForm] = useState({
    name: '',
    title: '',
    appointmentDate: '',
    description: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const all = getData('incidents') || [];
    const mine = all.filter(i => i.patientId === user?.patientId);
    setIncidents(mine);

    const modified = mine.find(i => i.wasModified);
    if (modified) {
      setNotification("📢 Your appointment was updated by the Admin.");
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allPatients = getData('patients') || [];
    const alreadyExists = allPatients.find(p => p.id === user.patientId);
    if (!alreadyExists) {
      const newPatient = {
        id: user.patientId,
        name: form.name,
        dob: 'N/A',
        contact: user.email,
        healthInfo: '',
      };
      setData('patients', [...allPatients, newPatient]);
    }

    const allIncidents = getData('incidents') || [];
    const newIncident = {
      id: uuid(),
      patientId: user.patientId,
      title: form.title || 'Appointment Request',
      appointmentDate: form.appointmentDate,
      description: form.description,
      comments: '',
      cost: '',
      treatment: '',
      status: 'Pending',
      nextDate: '',
      file: '',
      wasModified: false,
    };

    const updated = [...allIncidents, newIncident];
    setData('incidents', updated);

    const mine = updated.filter(i => i.patientId === user?.patientId);
    setIncidents(mine);
    setForm({ name: '', title: '', appointmentDate: '', description: '' });
    setShowForm(false);
  };

  const handleCancel = (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

    const all = getData('incidents') || [];
    const updated = all.filter(i => i.id !== id);
    setData('incidents', updated);

    const mine = updated.filter(i => i.patientId === user?.patientId);
    setIncidents(mine);
  };

  const upcomingFollowups = incidents.filter(i => i.status === 'Completed' && i.nextDate);

  return (
    <DashboardLayout>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">🧾 My Appointments & History</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          + Request Appointment
        </button>
      </div>

      {notification && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          {notification}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6 space-y-4 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">📅 Request an Appointment</h3>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="Eg: John Doe"
              value={form.name}
              onChange={handleChange}
              className="input w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Appointment Date & Time</label>
            <input
              type="datetime-local"
              name="appointmentDate"
              value={form.appointmentDate}
              onChange={handleChange}
              className="input w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Symptoms / Notes</label>
            <textarea
              name="description"
              placeholder="Describe your issue or request"
              value={form.description}
              onChange={handleChange}
              className="input w-full"
              required
              rows={4}
            />
          </div>

          <div className="text-right">
            <button type="submit" className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">
              ✅ Submit Request
            </button>
          </div>
        </form>
      )}

      {upcomingFollowups.length > 0 && (
        <div className="bg-indigo-50 border border-indigo-300 text-indigo-700 px-4 py-3 rounded mb-6">
          <strong className="block mb-1">📆 Upcoming Follow-Up:</strong>
          <ul className="list-disc pl-5 text-sm">
            {upcomingFollowups.map(i => (
              <li key={i.id}>
                <span className="font-medium">{i.title}</span> on <strong>{new Date(i.nextDate).toLocaleString()}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-white p-4 rounded shadow">
        {incidents.length === 0 ? (
          <p>No records found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500 border-b">
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Status</th>
                <th>Treatment</th>
                <th>Cost</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((i) => (
                <tr key={i.id} className="border-t">
                  <td>{new Date(i.appointmentDate).toLocaleString()}</td>
                  <td>{i.title}</td>
                  <td>{i.status}</td>
                  <td>{i.treatment || '-'}</td>
                  <td>{i.cost ? `₹${i.cost}` : '-'}</td>
                  <td>
                    {i.status !== 'Completed' && (
                      <button
                        onClick={() => handleCancel(i.id)}
                        className="text-red-500 hover:underline text-xs"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
}

export default PatientView;
