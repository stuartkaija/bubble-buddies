const express = require("express");
const router = express.Router();
const fs = require("fs");
const axios = require('axios');

require('dotenv').config();
const { REACT_APP_WEATHER_API_KEY, WEATHER_API_URL, MARINE_API_URL, REACT_APP_MARINE_API_KEY } = process.env;

// weather data
router.post('/', (req, res) => {
    const userInput = req.body.search
    axios
        .get(WEATHER_API_URL + REACT_APP_WEATHER_API_KEY + "&q=" + userInput)
        .then(response => res.status(200).json(response.data))
        .catch(error => console.log(error));
});

// marine data
router.post('/marine', (req, res) => {
    const coordinates = req.body
    axios
        .get(MARINE_API_URL + REACT_APP_MARINE_API_KEY + "&q=" + coordinates.lat + "," + coordinates.long + "&format=json&includelocation=yes")
        .then(response => res.status(200).json(response.data.data))
        .catch(error => console.log(error));
});

module.exports = router;