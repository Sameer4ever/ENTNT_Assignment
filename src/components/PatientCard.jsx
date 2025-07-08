import React from "react";

function PatientCard({ patient, onDelete }) {
  return (
    <div className="border p-3 mb-2 flex justify-between items-center">
      <div>
        <p className="font-bold">{patient.name}</p>
        <p>{patient.dob} — {patient.contact}</p>
        <p className="text-sm text-gray-600">{patient.healthInfo}</p>
      </div>
      {onDelete && (
        <button onClick={() => onDelete(patient.id)} className="text-red-500">Delete</button>
      )}
    </div>
  );
}

export default PatientCard;
