// routes/auth.js
const express = require('express');
const router = express.Router();
const { loginUser , createUser } = require('../controllers/authController');

// POST /api/login - Authenticate user
router.post('/login', loginUser);
// create user 
router.post('/users', createUser);


module.exports = router;