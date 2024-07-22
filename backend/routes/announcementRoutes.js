const express = require('express');
const { createAnnouncement, getAnnouncementById,  deleteAnnouncement, getAnnouncementsByClubId } = require('../controllers/announcementController');
const router = express.Router();

router.post('/', createAnnouncement);
router.get('/:clubId', getAnnouncementsByClubId);
router.get('/:id', getAnnouncementById);
router.delete('/:id', deleteAnnouncement);

module.exports = router;