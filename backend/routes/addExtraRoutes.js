const express = require('express');
const upload = require('../middleware/upload');
const AddExtra = require('../models/AddExtra');
const router = express.Router();

// Create AddExtra
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, price } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined; // Store image URL
    const newAddExtra = new AddExtra({ name, price, image });
    await newAddExtra.save();
    res.status(201).json(newAddExtra);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all AddExtras
router.get('/', async (req, res) => {
  try {
    const addExtras = await AddExtra.find();
    res.status(200).json(addExtras);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update AddExtra
router.put('/update/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, price } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;
    const addExtra = await AddExtra.findByIdAndUpdate(
      req.params.id,
      { name, price, image },
      { new: true }
    );
    res.status(200).json(addExtra);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete AddExtra
router.delete('/delete/:id', async (req, res) => {
  try {
    await AddExtra.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'AddExtra deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;