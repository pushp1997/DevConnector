const express = require('express');
const connectDB = require('./config/db');

app = express();

//Connecting
connectDB();

// Init Middleware
app.use(express.json({ extended: false })); //Helps in pasrsing req.body

app.get('/', (req, res) => res.send('API Running'));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));

//process.env.PORT will pickup the port from environment variable when deployed on Heroku
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
