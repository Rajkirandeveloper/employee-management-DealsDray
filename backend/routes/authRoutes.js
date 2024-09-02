const express = require('express');
const { login,registerUser } = require('../controllers/authController');
const router = express.Router();

//routes
router.post('/register', registerUser);
router.post('/login', login);

module.exports = router;
