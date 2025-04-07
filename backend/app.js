require('dotenv').config();
const express = require('express');
require('./db/connection');

const app = express();

//Define a test route
app.get('/', (req, res) => {
    res.send('API is running...');//Define a route when client send a get requset on the /URL
});

//Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`)); // It starts the server on port 5000