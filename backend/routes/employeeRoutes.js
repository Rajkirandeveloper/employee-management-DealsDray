const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const employeeController = require('../controllers/employeeController');
const upload = require('../middleware/upload');

router.get('/', authMiddleware,employeeController.getEmployees);
// router.post('/',authMiddleware, upload.single('image'), employeeController.createEmployee);
router.put('/:id',authMiddleware, upload.single('image'), employeeController.updateEmployee);
router.delete('/:id',authMiddleware, employeeController.deleteEmployee);

module.exports = router;
