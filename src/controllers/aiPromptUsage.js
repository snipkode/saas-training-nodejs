// aiPromptUsageController.js
const db = require('../config/db');

// Create AI Prompt Usage
const createAIPromptUsage = (req, res) => {
  const { user_id, prompt_text } = req.body;
  db.query('INSERT INTO ai_prompt_usage (user_id, prompt_text) VALUES (?, ?)', [user_id, prompt_text], (err, result) => {
    if (err) return res.status(500).send({ error: err.message });
    res.status(201).send({ message: 'AI prompt usage created successfully', id: result.insertId });
  });
};

// Get all AI Prompt Usages
const getAIPromptUsages = (req, res) => {
  db.query('SELECT * FROM ai_prompt_usage', (err, results) => {
    if (err) return res.status(500).send({ error: err.message });
    res.status(200).json(results);
  });
};

module.exports = {
  createAIPromptUsage,
  getAIPromptUsages
};
