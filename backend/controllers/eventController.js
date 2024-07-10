const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  const { name, date, location, clubId } = req.body;

  try {
    const event = await Event.create({ name, date, location, clubId });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  const { name, date, location, clubId } = req.body;

  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    event.name = name || event.name;
    event.date = date || event.date;
    event.location = location || event.location;
    event.clubId = clubId || event.clubId;

    await event.save();

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await event.destroy();

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
