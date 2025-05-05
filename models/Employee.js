const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  type: { type: String, enum: ['Full-Time', 'Part-Time', 'Contract'], required: true },
  profilePic: { type: String }, // URL for the profile picture
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
