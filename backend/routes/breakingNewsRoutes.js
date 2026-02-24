const express = require('express');
const router = express.Router();
const pool = require('../db/database');

// Get all breaking news (limit 5, latest first)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM breaking_news ORDER BY created_at DESC LIMIT 5');
    // Always return both Telugu and English fields
    res.json(rows.map(row => ({
      id: row.id,
      text: row.text,
      text_en: row.text_en || '',
      created_at: row.created_at
    })));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch breaking news' });
  }
});

// Add a breaking news item (Telugu and English)
router.post('/', async (req, res) => {
  const { text, text_en } = req.body;
  if (!text && !text_en) return res.status(400).json({ error: 'At least one of Telugu or English text is required' });
  try {
    const [result] = await pool.query('INSERT INTO breaking_news (text, text_en) VALUES (?, ?)', [text || '', text_en || '']);
    res.status(201).json({ id: result.insertId, text, text_en });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add breaking news' });
  }
});

// Delete a breaking news item
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM breaking_news WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete breaking news' });
  }
});


// Update a breaking news item (Telugu and English)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { text, text_en } = req.body;
  if (!text && !text_en) return res.status(400).json({ error: 'At least one of Telugu or English text is required' });
  try {
    await pool.query('UPDATE breaking_news SET text = ?, text_en = ? WHERE id = ?', [text || '', text_en || '', id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update breaking news' });
  }
});

module.exports = router;
