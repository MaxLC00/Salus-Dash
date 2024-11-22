const express = require('express');
const router = express.Router();
const client = require('smartsheet');

// Initialize Smartsheet client
const smartsheet = client.createClient({
    accessToken: process.env.SMARTSHEET_ACCESS_TOKEN
});

// Note: Since we're using '/api/sheets' in the main app, 
// we just need '/' here
router.get('/', async (req, res) => {
    console.log('API route hit');
    try {
        const response = await smartsheet.sheets.listSheets();
        console.log('Smartsheet response:', response);
        res.json(response);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;