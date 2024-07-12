const express = require('express');
const router = express.Router();
const {createPaymentIntent, paymentController} = require('../controllers/paymentController');

router.post('/create-payment-intent', createPaymentIntent);
router.post('/webhook', handleWebhook);

module.exports = router;
