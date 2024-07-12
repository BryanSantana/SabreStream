const stripe = require('stripe');
const Payment = require('../models/Payment');
const User = require('../models/User');
const Club = require('../models/Club');

exports.createPaymentIntent = async (req, res) => {
  const { amount, currency, userId, recipientId, recipientType } = req.body;

  try {
    const user = await User.findByPk(userId);
    let recipientAccountId;

    if (recipientType === 'coach') {
      const coach = await User.findByPk(recipientId);
      if (!coach) return res.status(404).json({ message: 'Coach not found' });
      recipientAccountId = coach.stripeAccountId;
    } else if (recipientType === 'club') {
      const club = await Club.findByPk(recipientId);
      if (!club) return res.status(404).json({ message: 'Club not found' });
      recipientAccountId = club.stripeAccountId;
    } else {
      return res.status(400).json({ message: 'Invalid recipient type' });
    }

    if (!user || !recipientAccountId) {
      return res.status(404).json({ message: 'User or recipient not found' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Amount in cents
      currency,
      metadata: { userId: user.id, recipientId },
      transfer_data: {
        destination: recipientAccountId,
      },
    });

    const payment = await Payment.create({
      amount,
      currency,
      status: 'pending',
      stripePaymentIntentId: paymentIntent.id,
      userId: user.id,
      recipientId,
      recipientType,
    });

    res.status(201).json({ clientSecret: paymentIntent.client_secret, payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;

    const payment = await Payment.findOne({
      where: { stripePaymentIntentId: paymentIntent.id },
    });

    if (payment) {
      payment.status = 'completed';
      await payment.save();
    }
  }

  res.status(200).send({ received: true });
};

