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
      refresh_url: 'https://sabrestreamredirect.web.app/refresh.html',
      return_url: 'https://sabrestreamredirect.web.app/return.html',
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

exports.completeOnboarding = async (req, res) => {
  const { stripeAccountId, userId, clubId } = req.body;

  try {
    // Find the user and update their stripeAccountId
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.stripeAccountId = stripeAccountId;
    await user.save();

    // Find the club and update its stripeAccountId
    const club = await Club.findByPk(clubId);
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    club.stripeAccountId = stripeAccountId;
    await club.save();

    res.status(200).json({ message: 'Stripe account successfully linked to user and club.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


