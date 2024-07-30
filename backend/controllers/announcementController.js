const Announcement = require('../models/Announcement');
const User = require('../models/User');
const Likes = require('../models/Likes');

exports.createAnnouncement = async (req, res) => {
    const {message, date, userId, clubId }= req.body;
    if (!message || !date || !clubId || !userId) {
      console.error('Missing fields in request:', req.body);
      return res.status(400).json({ message: 'All fields are required' });
    }
  try {
    const announcement = await Announcement.create({message, date, userId, clubId, likesCount: 0 });
    res.status(201).json(announcement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAnnouncementsByClubId = async (req, res) => {
  const { clubId } = req.params;
  const userId = req.query.userId; // Get userId from query params
  console.log(userId)
  try {
    const announcements = await Announcement.findAll({
      where: { clubId },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Check if each announcement is liked by the current user
    const announcementsWithLikes = await Promise.all(
      announcements.map(async (announcement) => {
        const likedByCurrentUser = await Likes.findOne({
          where: {
            announcementId: announcement.id,
            userId: userId,
          },
        });

        return { ...announcement.toJSON(), likedByCurrentUser: likedByCurrentUser };
      })
    );
    res.status(200).json(announcementsWithLikes);
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

exports.likeAnnouncement = async (req, res) => {
  const { userId, announcementId } = req.body;
  if (!userId || !announcementId) {
    return res.status(400).json({ message: 'User ID and Announcement ID are required' });
  }

  try {
    const like = await Likes.create({ userId, announcementId });
    const announcement = await Announcement.findByPk(announcementId);
    announcement.likesCount += 1;
    await announcement.save();
    res.status(201).json(like);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.unlikeAnnouncement = async (req, res) => {
  const { userId, announcementId } = req.body;
  if (!userId || !announcementId) {
    return res.status(400).json({ message: 'User ID and Announcement ID are required' });
  }

  try {
    const like = await Likes.findOne({ where: { userId, announcementId } });
    if (!like) {
      return res.status(404).json({ message: 'Like not found' });
    }
    await like.destroy();
    const announcement = await Announcement.findByPk(announcementId);
    announcement.likesCount -= 1;
    await announcement.save();
    res.status(200).json({ message: 'Like removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};