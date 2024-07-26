const express = require('express');
const { registerUser, loginUser, getUsers, getUserById, updateUser, deleteUser, getUserQrCode, uploadProfilePicture } = require('../controllers/userController');
const jwt = require('jsonwebtoken');
const upload = require('../middleware/upload');
const router = express.Router();

router.post('/upload-profile-picture/:id', upload.single('profilePicture'), uploadProfilePicture);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id/qrcode', getUserQrCode);

module.exports = router;
