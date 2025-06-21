const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bookingRoutes = require('./routes/bookingRoutes');
const roomRoutes = require('./routes/roomRoutes'); // Fixed path
const contactRoutes = require('./routes/ContactSchemaRoutes'); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());



mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(`DB Connection Error Sunny: ${error}`));

    

// Middleware for contact routes
app.use('/api/contacts', contactRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/rooms', roomRoutes);








// Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
