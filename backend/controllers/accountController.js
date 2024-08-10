// accountController.js

const stripe = require("stripe")(
  'sk_test_51PboBb2KlDhLAhWiUWyWPaiCOdV5G6tofUHXEF79TDBjuEnIUDYP7vjD7pZ6sscnSbu3oG9R9WrhFUg8PiDEuoch00nmld2aS5',
  {
    apiVersion: "2023-10-16",
  }
);

exports.createConnectedAccount = async (req, res) => {
  try {
    const account = await stripe.accounts.create({
      capabilities: {
        card_payments: {requested: true},
        transfers: {requested: true}
      },
      country: "US",
      type: "express",
    });

    res.json({
      account: account.id,
    });
  } catch (error) {
    console.error("Error creating Stripe account", error);
    res.status(500).json({ error: error.message });
  }
};

exports.generateOnboardingLink = async (req, res) => {
  try {
    const { accountId } = req.body;
    console.log(accountId)
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: 'sabrestream://refresh',
      return_url: 'sabrestream://return',
      type: 'account_onboarding',
    });

    console.log(accountLink)

    res.json({
      url: accountLink.url,
    });
  } catch (error) {
    console.error("Error generating onboarding link", error);
    res.status(500).json({ error: error.message });
  }
};
