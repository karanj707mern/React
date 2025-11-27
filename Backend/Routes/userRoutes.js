const express = require("express");
const {Register, Login, refreshTokenHandler, logout, getAllUsers, changeUserRole} = require("../Controllers/userController");
const auth = require('../middleware/auth');
const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post('/token', refreshTokenHandler);
router.post('/logout', logout);

// Admin routes
router.get('/all', auth('admin'), getAllUsers);
router.post('/:id/role', auth('admin'), changeUserRole);

module.exports = router;