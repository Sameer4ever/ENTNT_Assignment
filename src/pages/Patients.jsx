import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { getData, setData } from '../utils/localStorageHelpers';
import { v4 as uuid } from 'uuid';

function Patients() {
  const [form, setForm] = useState({
    name: '',
    dob: '',
    gender: '',
    contact: '',
    email: '',
    healthInfo: ''
  });
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const stored = getData('patients') || [];
    setPatients(stored);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddPatient = (e) => {
    e.preventDefault();
    const newPatient = { ...form, id: uuid() };
    const updated = [...patients, newPatient];
    setPatients(updated);
    setData('patients', updated);
    setForm({
      name: '',
      dob: '',
      gender: '',
      contact: '',
      email: '',
      healthInfo: ''
    });
  };

  const handleDelete = (id) => {
    const updated = patients.filter(p => p.id !== id);
    setPatients(updated);
    setData('patients', updated);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">👥 Manage Patients</h2>

        <form onSubmit={handleAddPatient} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="input"
          />
          <div className="flex flex-col">
            <label htmlFor="dob" className="text-gray-600 text-sm mb-1">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
            className="input"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder="Phone"
            required
            className="input"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="input"
          />
          <textarea
            name="healthInfo"
            value={form.healthInfo}
            onChange={handleChange}
            placeholder="Health Info / Notes"
            className="input md:col-span-2"
          />
          <button
            type="submit"
            className="md:col-span-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Add Patient
          </button>
        </form>

        <h3 className="text-lg font-semibold mb-2">📋 Patient List</h3>
        {patients.length === 0 ? (
          <p>No patients added yet.</p>
        ) : (
          <table className="w-full text-sm border-t">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">DOB</th>
                <th className="text-left p-2">Gender</th>
                <th className="text-left p-2">Contact</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">{p.dob}</td>
                  <td className="p-2">{p.gender}</td>
                  <td className="p-2">{p.contact}</td>
                  <td className="p-2">{p.email}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Delete
                    </button>
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

export default Patients;
