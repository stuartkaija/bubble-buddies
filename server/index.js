const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const weatherRoutes = require('./routes/weatherRoutes');

// config
require('dotenv').config();
const port = process.env.PORT || 8080;

// middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// routes
app.use("/users", userRoutes);
app.use("/weather", weatherRoutes);

app.listen(port, () => {
    console.log(`The server is running on ${port}`);
});