const express = require("express");
const router = express.Router();
const fs = require("fs");
const axios = require('axios');

require('dotenv').config();
const { REACT_APP_WEATHER_API_KEY, WEATHER_API_URL } = process.env;


//  get endpoint for the location the user searchs for, AND the weather at said location

//  request arrives from front-end, axios call gets made from here to the api, response comes back to to here, send response to user with data from api call...
router.post('/', (req, res) => {
    const userInput = req.body.search
    res.send("Sending love to the front end");
    axios
        .get(WEATHER_API_URL + REACT_APP_WEATHER_API_KEY + "&q=" + userInput)
        // .get("http://api.weatherapi.com/v1/current.json?key=6de91db3616a4f0aa9a04248222501&q=" + userInput)
        .then(response => console.log(response.data))
});


module.exports = router;