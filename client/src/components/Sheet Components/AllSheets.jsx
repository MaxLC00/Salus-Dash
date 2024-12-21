import { findAllSheets } from "../../../../utils/smartSheet";
import { useState, useEffect } from 'react';

function AllSheets({ children }) {
    const [sheets, setSheets] = useState([]);
    
    useEffect(() => {
        const loadSheets = async () => {
            try {
                const sheetsData = await findAllSheets();
                setSheets(sheetsData);
            } catch (error) {
                console.error('Error loading sheets:', error);
            }
        };
        
        loadSheets();
    }, []);

    return (
        <div style={{ height: 560, clear: "both", paddingTop: 120, textAlign: "center" }}>
            {children}
        </div>
    );
}

export { AllSheets };