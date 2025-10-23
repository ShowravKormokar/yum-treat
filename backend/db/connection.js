// 🌱 Load environment variables from `.env`
const dotenv = require('dotenv');
dotenv.config();

// 🧩 Import Mongoose (ODM library)
const mongoose = require('mongoose');

// 🌍 Determine which database to use based on environment
const isProduction = process.env.NODE_ENV === 'production';
const dbURI = isProduction
    ? process.env.MONGODB_URI // ☁️ MongoDB Atlas (Production)
    : process.env.LOCAL_DB_URI; // 💻 Local MongoDB (Development)


// 🚀 Connect to MongoDB
mongoose
    .connect(dbURI)
    .then(() => {
        console.log(
            `🚀MongoDB Connected Successfully → ${isProduction ? 'Atlas Cloud✅' : 'Localhost✅'
            }`
        );
    })
    .catch((err) => {
        console.error('❌ MongoDB Connection Error:', err.message);
        process.exit(1); // Exit process if DB fails to connect
    });

// 🧠 Connection Events (for debugging / monitoring)
mongoose.connection.on('connected', () => {
    console.log('🟢 Mongoose connection is open.');
});

mongoose.connection.on('disconnected', () => {
    console.log('🔴 Mongoose connection is disconnected.');
});

mongoose.connection.on('error', (err) => {
    console.error('⚠️ Mongoose connection error:', err);
});

// Graceful Shutdown (e.g., when app is stopped manually)
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('🛑 MongoDB connection closed due to app termination.');
    process.exit(0);
});

/* -------------------------------------------------
 * 💻 LOCAL CONNECTION (commented version)
 * Uncomment this section only if want to force
 * connect locally for development testing.
 -------------------------------------------------

mongoose.connect(process.env.LOCAL_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Local MongoDB connected.'))
.catch((err) => console.error('❌ Local MongoDB error:', err));

-------------------------------------------------- */

module.exports = mongoose;