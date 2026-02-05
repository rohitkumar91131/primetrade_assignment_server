const express = require('express');
const { register, login, logout, getProfile } = require('../controllers/authController');
const { protect, checkRole } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', protect, checkRole, getProfile);

module.exports = router;