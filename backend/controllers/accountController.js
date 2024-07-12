const stripe = require('../config/stripe');

exports.createConnectedAccount = async (req, res) => {
  try {
    const account = await stripe.accounts.create({
      type: 'express',
    });

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: 'https://example.com/reauth',
      return_url: 'https://example.com/return',
      type: 'account_onboarding',
    });

    res.status(201).json({ account, accountLink });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
