const express = require('express');
const { createEvent, getEventById, updateEvent, deleteEvent, signUpForEvent, checkInUser, getEventsByClubId } = require('../controllers/eventController');
const router = express.Router();

router.post('/', createEvent);
router.get('/:clubId', getEventsByClubId);
router.get('/:id', getEventById);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.post('/signup', signUpForEvent);
router.post('/checkin', checkInUser);

module.exports = router;
