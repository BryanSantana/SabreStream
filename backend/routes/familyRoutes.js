const express = require('express');
const { createFamily, getFamilies } = require('../controllers/familyController');
const router = express.Router();

router.post('/', createFamily);
router.get('/', getFamilies);

module.exports = router;
