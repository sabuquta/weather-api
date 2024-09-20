const express = require('express');
const router = express.Router();
const { saveWeatherDetails , getWeatherDetails } = require('../controllers/weatherController');

// POST /api/weather - Route to save user and weather info
router.post('/', saveWeatherDetails);
router.get('/', getWeatherDetails);

module.exports = router;
