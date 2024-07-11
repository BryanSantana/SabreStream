const express = require('express');
const { createAnnouncement, getAnnouncement, getAnnouncementById, updateAnnouncement, deleteAnnouncement } = require('../controllers/announcementController');
const router = express.Router();

router.post('/', createAnnouncement);
router.get('/', getAnnouncement);
router.get('/:id', getAnnouncementById);
router.put('/:id', updateAnnouncement);
router.delete('/:id', deleteAnnouncement);

module.exports = router;