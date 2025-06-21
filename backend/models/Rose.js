const mongoose = require('mongoose');

const roseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: false },
});

const Rose = mongoose.model('Rose', roseSchema);

module.exports = Rose;
