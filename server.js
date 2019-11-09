const express = require('express');
const connectDB = require('./config/db');

app = express();

//Connecting
connectDB();

app.get('/', (req, res) => res.send('API Running'));

//process.env.PORT will pickup the port from environment variable when deployed on Heroku
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
