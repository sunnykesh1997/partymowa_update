const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const themeRoutes = require('./routes/themes');
const bookingRoutes = require('./routes/bookingRoutes');
const cakeRoutes = require('./routes/cakeRoutes');
const decorationRoutes = require('./routes/decorationRoutes');
const roseRoutes = require('./routes/roseRoutes');
const selectedRoseRoutes = require('./routes/selectedRoseRoutes');
const selectedDecorationRoutes = require('./routes/selectedDecorationRoutes');
const photoSelectionRoutes = require('./routes/photoselectionRoutes');
const addExtraRoutes = require('./routes/addExtraRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"], // React frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serving images

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/themes', themeRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/cakes', cakeRoutes);
app.use('/api/decorations', decorationRoutes);
app.use('/api/roses', roseRoutes);
app.use('/api/selectedRose', selectedRoseRoutes);
app.use('/api/selectedDecor', selectedDecorationRoutes);
app.use('/api/addExtras', addExtraRoutes);
app.use('/api/photo-selections', photoSelectionRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));