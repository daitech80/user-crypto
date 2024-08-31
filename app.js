const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const bodyParser = require('body-parser');
const connode = require('./database/mydb')
const app = express();
const PORT = 4002;

// Connect to MongoDB
connode()

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const routes = require('./routes/route');
app.use('/', routes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
