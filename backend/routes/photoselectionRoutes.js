const express = require('express');
const PhotoSelection = require('../models/PhotoSelection');
const router = express.Router();

// Create a new photo selection time/price
router.post('/', async (req, res) => {
  try {
    const { time, price } = req.body;
    
    // Validate input
    if (!time || !price) {
      return res.status(400).json({ message: 'Time and price are required' });
    }

    const newSelection = new PhotoSelection({
      time,
      price
    });

    await newSelection.save();
    res.status(201).json(newSelection);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all photo selection times/prices
router.get('/', async (req, res) => {
  try {
    const selections = await PhotoSelection.find().sort({ time: 1 });
    res.status(200).json(selections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a photo selection time/price
router.put('/:id', async (req, res) => {
  try {
    const { time, price } = req.body;
    
    // Validate input
    if (!time || !price) {
      return res.status(400).json({ message: 'Time and price are required' });
    }

    const updatedSelection = await PhotoSelection.findByIdAndUpdate(
      req.params.id,
      { time, price },
      { new: true }
    );

    if (!updatedSelection) {
      return res.status(404).json({ message: 'Photo selection not found' });
    }

    res.status(200).json(updatedSelection);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a photo selection time/price
router.delete('/:id', async (req, res) => {
  try {
    const deletedSelection = await PhotoSelection.findByIdAndDelete(req.params.id);
    
    if (!deletedSelection) {
      return res.status(404).json({ message: 'Photo selection not found' });
    }

    res.status(200).json({ message: 'Photo selection deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;