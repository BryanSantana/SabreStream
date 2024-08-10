const express = require('express');
const router = express.Router();
const{createConnectedAccount, generateOnboardingLink} = require('../controllers/accountController');

router.post('/', createConnectedAccount);
router.post('/onboarding_link', generateOnboardingLink)
module.exports = router;
