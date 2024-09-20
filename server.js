// server.js
const express = require('express');
const mongoose = require('mongoose');
const weatherRoutes = require('./src/routes/weather');
const authRoutes = require('./src/routes/auth');
const cors = require('cors'); 
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;

const app = express();
const port = process.env.PORT || 5001;
app.use(express.json());

app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
  }));

// MongoDB connection
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('Hello from Vercel');
});
app.use('/api/auth', authRoutes);
app.use('/api/weather', weatherRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});