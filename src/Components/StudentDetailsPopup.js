import React from 'react';

const StudentDetailsPopup = ({ student, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Student Details</h2>
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
        <div className="modal-content">
          <p><strong>ID:</strong> {student.id}</p>
          <p><strong>First Name:</strong> {student.firstName}</p>
          <p><strong>Last Name:</strong> {student.lastName}</p>
          <p><strong>Email Id:</strong> {student.emailId}</p>
          <p><strong>Mobile Number:</strong> {student.mobileNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsPopup;
