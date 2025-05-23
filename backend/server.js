const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const imageRoutes = require('./routes/imageRoutes');

// General middleware
app.use(cors());
app.use(express.json());

// Serve static files with CORS headers explicitly set on each request
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}, express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/images', imageRoutes);

// Server start
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
