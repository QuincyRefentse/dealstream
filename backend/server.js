const express = require('express');
const multer = require('multer');
const dotenv = require('dotenv');
const path = require('path');
const documentRoutes = require('./routes/documentRoutes');

dotenv.config();  // Load environment variables from .env file

const app = express();

// Middleware to serve static files (uploaded documents)
app.use('/uploads', express.static('uploads'));

// Set up routes
app.use('/api/documents', documentRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
