const express = require('express');
const axios = require('axios');
const User = require('../models/User');
const router = express.Router();
const auth = require('../middleware/protect');


// Save user preferences (topics)
router.post('/preferences', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.preferences = req.body.preferences;
        await user.save();
        res.json({ msg: 'Preferences updated' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Fetch news based on user preferences
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const preferences = user.preferences;

        if (!preferences.length) {
            return res.status(400).json({ msg: 'No preferences set' });
        }

        // Fetch news from NewsAPI for each preference
        const apiKey = process.env.NEWS_API_KEY;
        const articles = [];

        for (let topic of preferences) {
            const newsUrl = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`;

            const newsResponse = await axios.get(newsUrl);
            articles.push(...newsResponse.data.articles); // Combine articles from each preference
        }

        res.json({ articles });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
