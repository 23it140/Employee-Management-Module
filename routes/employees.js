const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post('/employees', authMiddleware, upload.single('profilePic'), employeeController.createEmployee);
router.get('/employees', authMiddleware, employeeController.getAllEmployees);
router.get('/employees/:id', authMiddleware, employeeController.getEmployeeById);
router.put('/employees/:id', authMiddleware, employeeController.updateEmployee);
router.delete('/employees/:id', authMiddleware, employeeController.deleteEmployee);

module.exports = router;
