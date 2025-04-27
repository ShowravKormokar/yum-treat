require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRouter = require('./routers/authRouters');
const categoryRouter = require("./routers/categoryRoutes");
const foodRoutes = require('./routers/addFoodRoutes');
require('./db/connection');

const app = express();

// ------------------ 1. Allow request from frontend
const corsOptions = {
    origin: "http://localhost:5173", // only allow this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // only allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // only allow these headers
    credentials: true, // allow cookies or credentials if needed
};
app.use(cors(corsOptions));

// ------------------ 2. Body parser (MUST before routes)
app.use(express.json());

// ------------------ 3. Test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// ------------------ 4. Define all routes
app.use("/api/auth", authRouter);
app.use("/api", categoryRouter); // Your category routes
app.use('/api/foods', foodRoutes); // Your food routes

// ------------------ 5. Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
