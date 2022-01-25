const express = require("express");
const router = express.Router();
const fs = require("fs");

//  get endpoint for the location the user searchs for, AND the weather at said location

//  request arrives from front-end, axios call gets made from here to the api, response comes back to to here, send response to user with data from api call...
router.get('/', (req, res) => {
    console.log("get endpoint for user location search")
});


module.exports = router;