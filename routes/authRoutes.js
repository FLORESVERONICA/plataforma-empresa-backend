const express = require('express');
const router = express.Router();
const { register, login, assignRole, getUsers, createAdmin, getUserInfo, logout } = require('../controllers/authController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');



router.post('/register', register);
router.post('/login', login);


router.put('/assign-role/:id',authMiddleware, assignRole);
router.get('/users', authMiddleware, adminMiddleware, getUsers);
router.post('/create-admin-direct', createAdmin);
router.get('/user-info', authMiddleware, getUserInfo);
router.post('/logout',logout);



module.exports = router;
