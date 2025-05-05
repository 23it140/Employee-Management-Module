import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/employees', {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/employees/${id}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            <Link to={`/employee/${employee._id}`}>{employee.name}</Link>
            <button onClick={() => handleDelete(employee._id)}>Delete</button>
            <Link to={`/edit/${employee._id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
