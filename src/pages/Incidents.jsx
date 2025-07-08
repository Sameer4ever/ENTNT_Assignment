// src/pages/Incidents.jsx
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { getData, setData } from '../utils/localStorageHelpers';
import { v4 as uuid } from 'uuid';

function Incidents() {
  const [patients, setPatients] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [form, setForm] = useState({
    id: '', title: '', patientId: '', description: '', comments: '',
    appointmentDate: '', cost: '', treatment: '', status: '', nextDate: '', file: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadedPatients = getData('patients') || [];
    const loadedIncidents = getData('incidents') || [];

    setPatients(loadedPatients);
    setIncidents(loadedIncidents);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, file: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let updated;
    if (isEditing) {
      const original = incidents.find(i => i.id === form.id);
      const isDateChanged = original?.appointmentDate !== form.appointmentDate;
      const modifiedIncident = {
        ...form,
        wasModified: isDateChanged ? true : original.wasModified || false,
      };
      updated = incidents.map(i => (i.id === form.id ? modifiedIncident : i));
    } else {
      updated = [...incidents, { ...form, id: uuid(), wasModified: false }];
    }

    setIncidents(updated);
    setData('incidents', updated);

    setForm({
      id: '', title: '', patientId: '', description: '', comments: '',
      appointmentDate: '', cost: '', treatment: '', status: '', nextDate: '', file: '', wasModified: false
    });
    setIsEditing(false);
  };

  const handleEdit = (incident) => {
    setForm(incident);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    const updated = incidents.filter(i => i.id !== id);
    setIncidents(updated);
    setData('incidents', updated);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Manage Appointments / Incidents</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <label className="font-medium text-gray-600">Title</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="e.g., Root Canal, Checkup" className="input" required />

          <label className="font-medium text-gray-600">Select Patient</label>
          <select name="patientId" value={form.patientId} onChange={handleChange} className="input" required>
            <option value="">-- Select --</option>
            {patients.map(p => (
              <option key={p.id} value={p.id}>
                {p.name || p.contact || `Patient ${p.id}`}
              </option>
            ))}
          </select>

          <label className="font-medium text-gray-600 md:col-span-2">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe the reason for visit or issue" className="input md:col-span-2" />

          <label className="font-medium text-gray-600 md:col-span-2">Comments (Optional)</label>
          <textarea name="comments" value={form.comments} onChange={handleChange} placeholder="Extra notes" className="input md:col-span-2" />

          <label className="font-medium text-gray-600">Set Appointment Date & Time</label>
          <input type="datetime-local" name="appointmentDate" value={form.appointmentDate} onChange={handleChange} className="input" required />

          <hr className="md:col-span-2 my-2" />
          <h3 className="text-md font-semibold md:col-span-2 text-gray-700 mt-2">After Appointment</h3>

          <label className="font-medium text-gray-600">Treatment Cost (₹)</label>
          <input type="number" name="cost" value={form.cost} onChange={handleChange} placeholder="e.g., 1200" className="input" />

          <label className="font-medium text-gray-600">Treatment Performed</label>
          <input type="text" name="treatment" value={form.treatment} onChange={handleChange} placeholder="e.g., Filling, Cleaning" className="input" />

          <label className="font-medium text-gray-600">Treatment Status</label>
          <select name="status" value={form.status} onChange={handleChange} className="input">
            <option value="">-- Select --</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          <label className="font-medium text-gray-600">Next Treatment Scheduled On</label>
          <input type="date" name="nextDate" value={form.nextDate} onChange={handleChange} className="input" />

          <label className="font-medium text-gray-600 md:col-span-2">Upload Report or Invoice</label>
          <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} className="input md:col-span-2" />

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded md:col-span-2 mt-2 hover:bg-blue-700">
            {isEditing ? 'Update' : 'Add'} Incident
          </button>
        </form>
      </div>

      <div className="bg-white rounded shadow p-4">
        <h3 className="text-lg font-semibold mb-3">Incident History</h3>
        {incidents.length === 0 ? <p>No records yet.</p> : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-1">Title</th>
                <th className="px-2 py-1">Patient</th>
                <th className="px-2 py-1">Date</th>
                <th className="px-2 py-1">Status</th>
                <th className="px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((i) => (
                <tr key={i.id} className="border-t">
                  <td className="px-2 py-1">{i.title}</td>
                  <td className="px-2 py-1">
                    {patients.find(p => p.id === i.patientId)?.name ||
                      patients.find(p => p.id === i.patientId)?.contact ||
                      'Unknown'}
                  </td>
                  <td className="px-2 py-1">{new Date(i.appointmentDate).toLocaleString()}</td>
                  <td className="px-2 py-1">{i.status}</td>
                  <td className="px-2 py-1 space-x-2">
                    <button onClick={() => handleEdit(i)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(i.id)} className="text-red-500 hover:underline">Delete</button>
                    {i.file && (
                      <a href={i.file} download target="_blank" rel="noreferrer" className="text-green-600 hover:underline">File</a>
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

export default Incidents;
