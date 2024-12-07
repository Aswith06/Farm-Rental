const express = require('express');
const Equipment = require('../models/Equipment');

const router = express.Router();

// Create Equipment
router.post('/', async (req, res) => {
  try {
    const equipment = new Equipment(req.body);
    await equipment.save();
    res.status(201).json(equipment);
  } catch (error) {
    res.status(500).json({ error: 'Error adding equipment' });
  }
});

// Get All Equipment
router.get('/', async (req, res) => {
  try {
    const equipmentList = await Equipment.find();
    res.json(equipmentList);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching equipment' });
  }
});

// Update Equipment
router.put('/:id', async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ error: 'Error updating equipment' });
  }
});

// Delete Equipment
router.delete('/:id', async (req, res) => {
  try {
    await Equipment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Equipment deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting equipment' });
  }
});

module.exports = router;
