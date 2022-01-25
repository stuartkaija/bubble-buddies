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
    // res.send("Sending love to the front end");
    axios
        .get(WEATHER_API_URL + REACT_APP_WEATHER_API_KEY + "&q=" + userInput)
        // .get("http://api.weatherapi.com/v1/current.json?key=6de91db3616a4f0aa9a04248222501&q=Utila")
        // .then(response => console.log(response.data.location))
        .then(response => res.status(200).json(response.data))
        .catch(error => console.log(error));
        // .then(axios
        //         .get("http://api.worldweatheronline.com/premium/v1/marine.ashx?key=6270c0b02c5c4f02a0641150222501&q=15.65,-86.35")
        //         .then()

        //     )
});


module.exports = router;