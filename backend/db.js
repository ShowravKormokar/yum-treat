const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Event listeners for MongoDB connection
mongoose.connection.on('connected', () => {
    console.log("MongoDB Connected Successfully");
});

mongoose.connection.on('error', (err) => {
    console.error("MongoDB Connection Error: ", err);
});

mongoose.connection.on('disconnected', () => {
    console.log("MongoDB Disconnected");
});

module.exports = mongoose;
