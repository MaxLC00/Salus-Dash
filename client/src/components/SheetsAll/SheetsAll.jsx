import React, { useState, useEffect } from 'react';
import './SheetsAll.css';

export default function SheetsAll() {
    const [sheets, setSheets] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSheets = async () => {
            try {
                const response = await fetch('/api/sheets');
                const data = await response.json();
                setSheets(data.data || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSheets();
    }, []);

    const handleCreatePackage = (sheetId, sheetName) => {
        console.log(`Creating package for sheet: ${sheetName} (ID: ${sheetId})`);
        // Add your dashboard creation logic here
    };

    if (loading) {
        return <div className="container">Loading sheets...</div>;
    }
    
    if (error) {
        return <div className="container">Error: {error}</div>;
    }

    return (
        <div className="container" style={{ border: '1px solid red' }}>
            <h1>All Sheets ({sheets.length})</h1>
            <div className="sheets-grid" style={{ border: '1px solid blue' }}>
                {sheets.map((sheet) => (
                    <div 
                        key={sheet.id} 
                        className="sheet-card"
                        style={{ border: '1px solid green' }}
                    >
                        <h3>{sheet.name}</h3>
                        <p>Access Level: {sheet.accessLevel}</p>
                        <p>Created: {new Date(sheet.createdAt).toLocaleDateString()}</p>
                        <p>Modified: {new Date(sheet.modifiedAt).toLocaleDateString()}</p>
                        <div className="card-actions">
                            <a 
                                href={sheet.permalink} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="sheet-link"
                            >
                                Open in Smartsheet
                            </a>
                            <button 
                                onClick={() => handleCreatePackage(sheet.id, sheet.name)}
                                className="dashboard-button"
                            >
                                Create Dashboard
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}