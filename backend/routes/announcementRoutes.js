const express = require('express');
const { createAnnouncement, getAnnouncements, getAnnouncementById, updateAnnouncement, deleteAnnouncement } = require('../controllers/announcementController');
const router = express.Router();

router.post('/', createAnnouncement);
router.get('/', getAnnouncements);
router.get('/:id', getAnnouncementById);
router.delete('/:id', deleteAnnouncement);

module.exports = router;