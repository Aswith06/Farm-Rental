const express = require('express');
const Booking = require('../models/Booking');
const Equipment = require('../models/Equipment');

const router = express.Router();

// Create Booking
router.post('/', async (req, res) => {
  try {
    const { userId, equipmentId, startDate, endDate } = req.body;
    const equipment = await Equipment.findById(equipmentId);
    if (!equipment || !equipment.available) {
      return res.status(400).json({ error: 'Equipment not available' });
    }
    const booking = new Booking({ user: userId, equipment: equipmentId, startDate, endDate });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Error creating booking' });
  }
});

// Get Bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user equipment');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching bookings' });
  }
});

// Update Booking
router.put('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Error updating booking' });
  }
});

// Delete Booking
router.delete('/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting booking' });
  }
});

module.exports = router;
