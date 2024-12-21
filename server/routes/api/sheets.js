const router = require('express').Router();

router.get('/sheets', async (req, res) => {
    try {
        // Your logic to fetch sheets data
        const sheets = []; // Replace with actual data
        res.json(sheets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router