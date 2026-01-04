
import express from 'express';
import { generateNewsUpdates } from '../services/newsService';

const router = express.Router();

// GET /api/news/latest
router.get('/latest', async (req, res) => {
    try {
        const lang = (req.query.lang as string) || 'en';
        console.log(`[NewsAPI] Fetching news for language: ${lang}`);
        const news = await generateNewsUpdates(lang);
        res.json(news);
    } catch (error) {
        console.error("News Fetch Error:", error);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

export default router;
