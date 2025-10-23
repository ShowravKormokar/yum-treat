require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRouter = require('./routers/authRouters');
const categoryRouter = require("./routers/categoryRoutes");
const foodRoutes = require('./routers/addFoodRoutes');
const orderRoutes = require("./routers/orderRoutes");
const reviewRoutes = require("./routers/reviewRoutes");

require('./db/connection');

const app = express();

const allowedOrigins = [
    "http://localhost:5173",            // local frontend
    "https://yum-treat.vercel.app",     // deployed frontend (replace with your exact domain)
];

// ------------------ 1. Allow request from frontend
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or Postman)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // only allow these HTTP methods
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
app.use("/api", categoryRouter); // category routes
app.use('/api/foods', foodRoutes); // food routes
app.use("/api/orders", orderRoutes); // order routes
app.use("/api/reviews", reviewRoutes); // Review routes

// ------------------ 5. Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
