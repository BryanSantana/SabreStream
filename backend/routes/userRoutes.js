const express = require('express');
const { registerUser, loginUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id/qrcode', getUserQrCode);

module.exports = router;
