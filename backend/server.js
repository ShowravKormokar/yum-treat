require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./db'); // Import database connection file

const app = express();

// Middleware
const { logger } = require('./middleware');
app.use(logger);

app.use(express.json());
app.use(cors());

// Define a test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
