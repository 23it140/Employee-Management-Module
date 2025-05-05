import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useHistory } from 'react-router-dom';

const EmployeeForm = ({ employee = {}, isEditing }) => {
  const [name, setName] = useState(employee.name || '');
  const [email, setEmail] = useState(employee.email || '');
  const [department, setDepartment] = useState(employee.department || '');
  const [type, setType] = useState(employee.type || '');
  const [profilePic, setProfilePic] = useState(null);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('department', department);
    formData.append('type', type);
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }

    try {
      if (isEditing) {
        await axios.put(`/employees/${employee._id}`, formData, {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
      } else {
        await axios.post('/employees', formData, {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
      }
      history.push('/');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" required />
      <select value={type} onChange={(e) => setType(e.target.value)} required>
        <option value="">Select Type</option>
        <option value="Full-Time">Full-Time</option>
        <option value="Part-Time">Part-Time</option>
        <option value="Contract">Contract</option>
      </select>
      <input type="file" onChange={(e) => setProfilePic(e.target.files[0])} />
      <button type="submit">{isEditing ? 'Update' : 'Create'} Employee</button>
    </form>
  );
};

export default EmployeeForm;
