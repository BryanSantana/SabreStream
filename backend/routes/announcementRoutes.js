const express = require('express');
const { createAnnouncement, getAnnouncementById,  deleteAnnouncement, getAnnouncementsByClubId, likeAnnouncement, unlikeAnnouncement} = require('../controllers/announcementController');
const router = express.Router();

router.post('/', createAnnouncement);
router.get('/:clubId', getAnnouncementsByClubId);
router.get('/:id', getAnnouncementById);
router.delete('/:id', deleteAnnouncement);
router.post('/like', likeAnnouncement);
router.post('/unlike', unlikeAnnouncement);

module.exports = router;