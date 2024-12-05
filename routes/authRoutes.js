const express = require('express');
const router = express.Router();
const { register, login, assignRole, getUsers, createAdmin } = require('../controllers/authController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

// Rutas de autenticación
router.post('/register', register);
router.post('/login', login);

// Rutas de gestión de usuarios
router.put('/assign-role/:id',authMiddleware, assignRole);
router.get('/users', authMiddleware, adminMiddleware, getUsers);
router.post('/create-admin-direct', createAdmin);

module.exports = router;
