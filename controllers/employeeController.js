const Employee = require('../models/Employee');
const path = require('path');

// Create a new Employee
exports.createEmployee = async (req, res) => {
  const { name, email, department, type } = req.body;
  const profilePic = req.file ? req.file.path : ''; // Profile image uploaded via multer

  try {
    const newEmployee = new Employee({ name, email, department, type, profilePic });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: "Error creating employee", error: err });
  }
};

// List all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(400).json({ message: "Error fetching employees", error: err });
  }
};

// Get single employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (err) {
    res.status(400).json({ message: "Error fetching employee", error: err });
  }
};

// Edit an employee
exports.updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: "Error updating employee", error: err });
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: "Error deleting employee", error: err });
  }
};
