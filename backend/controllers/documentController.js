const { verifyDocument } = require('../services/aiVerification');
const { convertFileToText } = require('../utils/fileUtils');
const fs = require('fs');

exports.uploadDocument = async (req, res) => {
    try {
        const file = req.file;
        const documentType = req.body.type;  // Get the document type (e.g., KYC, LOI)

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Convert file to text (OCR for images, text extraction for PDFs)
        const documentText = await convertFileToText(file.path);

        // Verify the document using AI
        const verificationResult = await verifyDocument(documentText, documentType);

        // Optionally, delete the uploaded file after processing
        fs.unlinkSync(file.path);

        // Send the verification result back to the frontend
        res.json({ status: 'success', result: verificationResult });
    } catch (error) {
        console.error('Error during document upload and verification:', error);
        res.status(500).json({ message: 'Error during document verification', error: error.message });
    }
};
