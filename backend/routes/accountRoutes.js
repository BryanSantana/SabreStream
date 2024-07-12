const express = require('express');
const router = express.Router();
const{createConnectedAccount} = require('../controllers/accountController');

router.post('/create-account', createConnectedAccount);

module.exports = router;
