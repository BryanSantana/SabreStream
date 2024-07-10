const Club = require('../models/Club');

exports.createClub = async (req, res) => {
  try {
    const club = await Club.create(req.body);
    res.status(201).json(club);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getClubs = async (req, res) => {
  try {
    const clubs = await Club.findAll();
    res.status(200).json(clubs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
