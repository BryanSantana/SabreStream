const Event = require('../models/Event');
const User = require('../models/User');
const UserEvent = require('../models/UserEvent');
exports.createEvent = async (req, res) => {
  const { name, date, location, type, clubId, userId } = req.body;
  try {
    const event = await Event.create({ name, date, location, type, clubId , userId});
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getEventsByClubId = async (req, res) => {
  try {
    const { clubId } = req.params;
    const events = await Event.findAll({
      where: { clubId }
    });

    if (!events || events.length === 0) {
      return res.status(404).json({ message: 'No events found for this club' });
    }

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

exports.signUpForEvent = async (req, res) => {
  const { userId, eventId } = req.body;

  try {
    const event = await Event.findByPk(eventId);
    const user = await User.findByPk(userId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let userEvent = await UserEvent.findOne({ where: { userId, eventId } });

    if (!userEvent) {
      userEvent = await UserEvent.create({ userId, eventId, signedUp: true });
    } else {
      userEvent.signedUp = true;
      await userEvent.save();
    }

    res.status(200).json({ message: 'User signed up for the event successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.checkInUser = async (req, res) => {
  const { userId, eventId } = req.body;

  try {
    const event = await Event.findByPk(eventId);
    const user = await User.findByPk(userId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let userEvent = await UserEvent.findOne({ where: { userId, eventId } });

    if (!userEvent || !userEvent.signedUp) {
      return res.status(400).json({ message: 'User has not signed up for the event' });
    }

    userEvent.checkedIn = true;
    await userEvent.save();

    res.status(200).json({ message: 'User checked in successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
