import React from "react";

function IncidentForm({ form, setForm, patients, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <select className="border p-2 w-full" value={form.patientId}
        onChange={e => setForm({ ...form, patientId: e.target.value })} required>
        <option value="">Select Patient</option>
        {patients.map(p => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
      <input className="border p-2 w-full" placeholder="Title" value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })} required />
      <textarea className="border p-2 w-full" placeholder="Description"
        value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      <input className="border p-2 w-full" type="datetime-local"
        value={form.appointmentDate} onChange={e => setForm({ ...form, appointmentDate: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Comments"
        value={form.comments} onChange={e => setForm({ ...form, comments: e.target.value })} />
      <button className="bg-indigo-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
}

export default IncidentForm;
