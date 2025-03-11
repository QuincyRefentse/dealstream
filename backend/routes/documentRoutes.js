const express = require('express');
const multer = require('multer');
const { uploadDocument } = require('../controllers/documentController');

const router = express.Router();

// Set up file upload configuration with multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');  // Save to the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Unique file name
    }
});

const upload = multer({ storage: storage });

// Define the document upload route
router.post('/upload', upload.single('document'), uploadDocument);

module.exports = router;
