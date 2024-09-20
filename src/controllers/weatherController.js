// controllers/weatherController.js
const axios = require('axios');
const Weather = require('../models/Weather');
require('dotenv').config();

const weatherApiKey = process.env.WEATHER_API_KEY;

// Controller function to save weather details
const saveWeatherDetails = async (req, res) => {
  const { name, email, city , temperature, humidity, description } = req.body;
    console.log(req.body);
  try {
    // Create a new weather record
    const weatherRecord = new Weather({
      user: { name, email },
      city,
      weather: {
        description,
        temperature,
        humidity
      }
    });

    // Save the weather record to MongoDB
    await weatherRecord.save();

    res.status(201).json({ message: 'Weather details saved', data: weatherRecord });
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ message: 'Error fetching weather data or saving to database' });
  }
};

// Fetch all weather records from MongoDB
const getWeatherDetails = async (req, res) => {
    try {
      const weatherRecords = await Weather.find();
      res.status(200).json({ message: 'Weather details retrieved', data: weatherRecords });
    } catch (error) {
      console.error('Error retrieving weather details:', error.message);
      res.status(500).json({ message: 'Error retrieving weather details' });
    }
  };

module.exports = {
  saveWeatherDetails,
  getWeatherDetails
};