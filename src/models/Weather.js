const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  city: { type: String, required: true },
  weather: {
    description: { type: String },
    temperature: { type: Number },
    humidity: { type: Number }
  },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Weather', WeatherSchema);
