const express = require('express');
const app = express();
const cors = require('cors');

// config
require('dotenv').config();
const port = process.env.PORT || 8080;

// middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// routes


app.listen(port, () => {
    console.log(`The server is running on ${port}`);
});