require('dotenv').config();
const express = require('express');
const authRouter = require('./routers/authRouters');
const cors = require('cors');
require('./db/connection');

const app = express();

//Allow request from frontend
const corsOptions = {
    origin: "http://localhost:5173", // only allow this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // only allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // only allow these headers
    credentials: true, // allow cookies or credentials if needed
};
app.use(cors(corsOptions));

//---------------------------Define a test route
app.get('/', (req, res) => {
    res.send('API is running...');//Define a route when client send a get requset on the /URL
});

// ------------------------- Add all routes 
// app.use(express.json());
app.use("/api/auth", authRouter);

//-------------------------- Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`)); // It starts the server on port 5000