const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. IMPROVED MIDDLEWARE
app.use(express.json()); 

// 2. UPDATED CORS FOR DEPLOYMENT
// Replace the URL below with your actual Vercel frontend URL
app.use(cors({
  origin: ["https://animax-cinema-7avm5t90y-yash-jodhs-projects.vercel.app","http://localhost:8080"], 
  credentials: true
}));

// 3. DATABASE CONNECTION (Critical for 500 errors)
// Added a check to prevent multiple connections in serverless environments
if (mongoose.connection.readyState === 0) {
    mongoose.connect(process.env.MONGO_URI)
      .then(() => console.log("✅ MongoDB Connected"))
      .catch(err => {
          console.error("❌ Connection Error:", err);
          // Don't let the process hang on a failed connection
      });
}

// 4. ROUTES
app.use('/api/auth', require('./routes/auth'));
app.use('/api/watchlist', require('./routes/watchlist'));

// 5. SERVERLESS EXPORT
// Vercel handles the port; we just need to export the app
const PORT = process.env.PORT || 5000;

// Only listen if we are NOT on Vercel (local dev)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

module.exports = app; // Required for Vercel to treat this as a function