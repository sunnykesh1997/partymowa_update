const mongoose = require('mongoose');

const addExtraSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: false }, // Store image URL (after uploading to server)
});

const AddExtra = mongoose.model('AddExtra', addExtraSchema);

module.exports = AddExtra;