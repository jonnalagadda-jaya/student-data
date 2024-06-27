import React, { useState, useEffect } from 'react';

const StudentForm = ({ student, saveStudent, cancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    emailId: '',
    mobileNumber: '',
  });

  useEffect(() => {
    setFormData(student || {
      id: '',
      firstName: '',
      lastName: '',
      emailId: '',
      mobileNumber: '',
    });
  }, [student]);

  const handleChange = (e) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data on submit:", formData);
    saveStudent(formData); 
  };

  return (
    <div className="student-form">
      <form onSubmit={handleSubmit}>
        <input 
          name="id" 
          value={formData.id} 
          onChange={handleChange} 
          placeholder="Enter your Id" 
          required 
        />
        <input 
          name="firstName" 
          value={formData.firstName} 
          onChange={handleChange} 
          placeholder="First Name" 
          required 
        />
        <input 
          name="lastName" 
          value={formData.lastName} 
          onChange={handleChange} 
          placeholder="Last Name" 
          required 
        />
        <input 
          name="emailId" 
          type='email'
          value={formData.emailId} 
          onChange={handleChange} 
          placeholder="Email Id" 
          required 
          readOnly={Boolean(student.emailId)} 
        />
        <input 
          name="mobileNumber" 
          value={formData.mobileNumber} 
          onChange={handleChange} 
          placeholder="Mobile Number" 
          required 
        />
        <button type="submit">Save</button>
        <button type="button" onClick={cancel}>Cancel</button>
      </form>
    </div>
  );
};

export default StudentForm;
