const Family = require('../models/Family');

exports.createFamily = async (req, res) => {
  try {
    const family = await Family.create(req.body);
    res.status(201).json(family);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getFamilies = async (req, res) => {
  try {
    const families = await Family.findAll();
    res.status(200).json(families);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
