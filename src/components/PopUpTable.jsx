import React, { useState } from 'react';
import '../css/PopupTable.css'; // We'll define styles below

const PopupTable = ({ data, onSelect, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Select a Patient</h2>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>DOB</th>
            </tr>
          </thead>
          <tbody>
            {data.map((patient, index) => (
              <tr key={index} onClick={() => onSelect(patient)}>
                <td>{patient.pFirstName}</td>
                <td>{patient.pLastName}</td>
                <td>{patient.dob}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PopupTable;