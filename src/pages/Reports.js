import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Reports = () => {
  const [detections, setDetections] = useState([]);
  const navigate = useNavigate();

  // Load detection data from localStorage on component mount
  useEffect(() => {
    const loadDetections = () => {
      const savedData = localStorage.getItem('detectionReports');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setDetections(parsedData);
      }
    };

    loadDetections();
  }, []);

  // Function to format timestamp
  const formatTimestamp = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Detection Reports</h1>
        <button 
          onClick={() => navigate(-1)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Back to Camera
        </button>
      </div>

      {detections.length === 0 ? (
        <p>No detection records found.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
            backgroundColor: 'white'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={tableHeaderStyle}>Object #</th>
                <th style={tableHeaderStyle}>Object Type</th>
                <th style={tableHeaderStyle}>Probability</th>
                <th style={tableHeaderStyle}>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {detections.map((detection, index) => (
                <tr key={detection.objectNo} style={index % 2 === 0 ? { backgroundColor: '#f8f9fa' } : null}>
                  <td style={tableCellStyle}>{index + 1}</td>
                  <td style={tableCellStyle}>{detection.objectType}</td>
                  <td style={tableCellStyle}>{detection.objectProbability}%</td>
                  <td style={tableCellStyle}>{formatTimestamp(detection.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Table styling
const tableHeaderStyle = {
  padding: '12px 15px',
  textAlign: 'left',
  borderBottom: '2px solidrgb(30, 93, 156)',
  fontWeight: '600',
};

const tableCellStyle = {
  padding: '12px 15px',
  borderBottom: '1px solidrgb(41, 103, 165)',
  verticalAlign: 'top',
};

export default Reports;