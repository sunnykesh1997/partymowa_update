const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  event: { type: String, required: true },
  persons: { type: Number, default: 4 },
  addons: { type: String, default: 'No' },
  theme: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  cake: [{
    cakeName: String,
    cakePrice: Number,
    cakeQuantity: Number,
    cakeType: String
  }],
  decoration: [{
    decorationName: String,
    decorationPrice: Number
  }],
  rose: [{
    roseName: String,
    rosePrice: Number
  }],
  addExtras: [{
    extraName: String,
    extraPrice: Number
  }],
  photoSelections: [{
    time: String,
    price: Number
  }]
});

module.exports = mongoose.model('Booking', bookingSchema);
