const Payment = require('../models/Payment');

exports.createPayment = async (req, res) => {
  const { userId, clubId, amount, status } = req.body;

  try {
    const payment = await Payment.create({ userId, clubId, amount, status });
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
