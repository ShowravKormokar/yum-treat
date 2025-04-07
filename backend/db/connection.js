//Load variable that stored in the '.env' file
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose'); // Mongoose (ODM-object data modeling library) used to efficiently manage data

const db = process.env.DATA_BASE; // Read data base url from '.env' file (way- 01)

// Connection error handling (Way-01)
mongoose.connect(db)
    .then(() => {
        console.log("MongoDB connected successfully.✌️");
    })
    .catch((err) => {
        console.error(`MongoDB connection error: ${err}`);
    });

/*
// Read data base url from '.env' file (way- 02)
mongoose.connect(process.env.DATA_BASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Connection error handling (Way-02)
mongoose.connection.on('connected', () => {
    console.log("MongoDB connected successfully.");
});
mongoose.connection.on('error', (err) => {
    console.error("MongoDB connection error: ", err);
});
mongoose.connection.on('disconnected', () => {
    console.log("MongoDB disconnected.");
});

Way-02 is better than way-01 because it is secure, configurable and scalable. It helps to add new feature easily make application more maintainable and
*/