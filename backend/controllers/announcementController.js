const Announcement = require('../models/Announcement');

exports.createAnnouncement = async (req, res) => {
    const {message, date, userId} = req.body;
  try {
    const announcement = await Announcement.create({message, date, userId});
    res.status(201).json(announcement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.findAll();
    res.status(200).json(announcements);
  } catch (error) {
    res.status(400).json({ error: error.message });
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