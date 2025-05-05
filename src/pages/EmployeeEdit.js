import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useParams } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm';

const EmployeeEdit = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`/employees/${id}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Employee</h2>
      <EmployeeForm employee={employee} isEditing={true} />
    </div>
  );
};

export default EmployeeEdit;
