import React from 'react';
import EmployeeForm from '../components/EmployeeForm';

const EmployeeCreate = () => {
  return (
    <div>
      <h2>Create New Employee</h2>
      <EmployeeForm isEditing={false} />
    </div>
  );
};

export default EmployeeCreate;
