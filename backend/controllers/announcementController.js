const Announcement = require('../models/Announcement');
const User = require('../models/User');

exports.createAnnouncement = async (req, res) => {
    const {message, date, userId, clubId }= req.body;
    if (!message || !date || !clubId || !userId) {
      console.error('Missing fields in request:', req.body);
      return res.status(400).json({ message: 'All fields are required' });
    }
  try {
    const announcement = await Announcement.create({message, date, date, userId, clubId});
    res.status(201).json(announcement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAnnouncementsByClubId = async (req, res) => {
  try {
    const { clubId } = req.params;
    const announcements = await Announcement.findAll({
      where: { clubId },
      include: {
        model: User,
        attributes: ['name'],
      },
    });

    if (!announcements || announcements.length === 0) {
      return res.status(404).json({ message: 'No announcements found for this club' });
    }

    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAnnouncementById = async(req,res) => {
    try {
        const announcement = await Announcement.findByPk(req.params.id);

        if (!announcement) {
            return res.status(404).json({message: 'Announcement not found'});
        }
        res.status(200).json(announcement);
    } catch (error){
        res.status(500).json({message: error.message})
    }
}

exports.deleteAnnouncement = async(req,res) => {
try {
    const announcement = await Announcement.findByPk(req.params.id);
    if (!announcement){
        return res.status(404).json({message: 'Announcement not found'})
    }
    await announcement.destroy();
    res.status(200).json({message: 'Event deleted successfully'})
} catch (error) {
    res.status(500).json({message: error.message})
}

}