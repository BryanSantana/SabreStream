const express = require('express');
const { createTier } = require('../controllers/tierController');
const router = express.Router();

router.post('/', createTier)
module.exports = router;