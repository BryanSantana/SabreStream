const Tier = require('../models/Tier');

exports.createTier = async (req, res) => {
  const { userId, clubId, stripeAccountId, tiers } = req.body;
  
  if (!userId || !clubId || !stripeAccountId || !tiers) {
    console.error('Missing fields in request:', req.body);
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const createdTiers = [];

    for (const tier of tiers) {
      // Create the tier on Stripe
      const stripeProduct = await stripe.products.create({
        name: tier.name,
        type: 'service',
      });

      const stripePrice = await stripe.prices.create({
        unit_amount: Math.round(tier.price * 100), // Convert dollars to cents
        currency: 'usd',
        recurring: { interval: tier.duration },
        product: stripeProduct.id,
      });

      // Save the tier in the database
      const createdTier = await Tier.create({
        name: tier.name,
        price: tier.price,
        frequency: tier.duration,
        stripeAccountId: stripeAccountId,
        stripeProductId: stripeProduct.id,
        stripePriceId: stripePrice.id,
      });

      createdTiers.push(createdTier);
    }

    res.status(201).json(createdTiers);
  } catch (error) {
    console.error('Error creating tiers:', error);
    res.status(500).json({ message: error.message });
  }
};