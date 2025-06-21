const mongoose = require('mongoose');

const photoSelectionSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const PhotoSelection = mongoose.model('PhotoSelection', photoSelectionSchema);

module.exports = PhotoSelection;