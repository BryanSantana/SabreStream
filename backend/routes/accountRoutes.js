const express = require('express');
const router = express.Router();
const{createConnectedAccount, generateOnboardingLink, completeOnboarding} = require('../controllers/accountController');

router.post('/', createConnectedAccount);
router.post('/onboarding_link', generateOnboardingLink)
router.post('/complete_onboarding', completeOnboarding)
module.exports = router;
