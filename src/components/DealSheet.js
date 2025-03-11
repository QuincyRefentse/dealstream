import React, { useState } from 'react';
import './DealSheet.css'; // Import the CSS file for styling

const DealSheet = () => {
    const [documents, setDocuments] = useState({
        kyc: null,
        loi: null,
        labReport: null,
        icpo: null,
        fco: null,
        sfpa: null,
        spaDraft: null,
        siteVisit: null,
        spaSigned: null
    });

    const handleFileUpload = (e, fieldName) => {
        const file = e.target.files[0];
        setDocuments({
            ...documents,
            [fieldName]: file
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        for (const [key, file] of Object.entries(documents)) {
            if (file) {
                console.log(`Uploading ${key}:`, file);
                // Example AI verification API call
                // await aiVerifyDocument(file, key);
            } else {
                alert(`${key} document is required`);
            }
        }
    };

    return (
        <div className="document-upload-container">
            <h1>Deal Negotiation Documents Upload</h1>
            <form onSubmit={handleSubmit} className="upload-form">
                <div className="input-group">
                    <label>Know Your Customer (KYC)</label>
                    <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, 'kyc')}
                        className="file-input"
                    />
                </div>
                <div className="input-group">
                    <label>Letter Of Interest (LOI)</label>
                    <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, 'loi')}
                        className="file-input"
                    />
                </div>
                <div className="input-group">
                    <label>Lab Report</label>
                    <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, 'labReport')}
                        className="file-input"
                    />
                </div>
                <div className="input-group">
                    <label>Irrevocable Corporate Purchase Order (ICPO)</label>
                    <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, 'icpo')}
                        className="file-input"
                    />
                </div>
                <div className="input-group">
                    <label>Full Corporate Order (FCO)</label>
                    <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, 'fco')}
                        className="file-input"
                    />
                </div>
                <div className="input-group">
                    <label>Signing of Paymaster Agreement (SFPA)</label>
                    <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, 'sfpa')}
                        className="file-input"
                    />
                </div>
                <div className="input-group">
                    <label>Sales & Purchase Agreement (SPA) Draft</label>
                    <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, 'spaDraft')}
                        className="file-input"
                    />
                </div>
                <div className="input-group">
                    <label>Site Visit / Testing</label>
                    <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, 'siteVisit')}
                        className="file-input"
                    />
                </div>
                <div className="input-group">
                    <label>SPA Signing & Transfer of Payment</label>
                    <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, 'spaSigned')}
                        className="file-input"
                    />
                </div>
                <button type="submit" className="submit-button">Submit Documents</button>
            </form>
        </div>
    );
};

export default DealSheet;
