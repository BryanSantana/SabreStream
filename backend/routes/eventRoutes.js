const express = require('express');
const { createEvent, getEvents, getEventById, updateEvent, deleteEvent, signUpForEvent } = require('../controllers/eventController');
const router = express.Router();

router.post('/', createEvent);
router.get('/', getEvents);
router.get('/:id', getEventById);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.post('/signup', signUpForEvent);
router.post('/checkin', checkInUser);

module.exports = router;
