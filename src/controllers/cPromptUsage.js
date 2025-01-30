const db = require('../config/db');

// Create AI Prompt Usage
const createAIPromptUsage = (req, res) => {
  const { prompt_text } = req.body;
  const user_id         = req.user.id;

  db.query('INSERT INTO ai_prompt_usage (user_id, prompt_text) VALUES (?, ?)', [user_id, prompt_text], (err, result) => {
    if (err) return res.status(500).send({ error: err.message });
    res.status(201).send({ message: 'AI prompt usage created successfully', id: result.insertId });
  });
};

// Get all AI Prompt Usages by user
const getAIPromptUsages = (req, res) => {
  // console.log("check user data", req.user);
  const user_id         = req.user.id;
  db.query('SELECT * FROM ai_prompt_usage WHERE user_id = ?', [user_id], (err, results) => {
    if (err) return res.status(500).send({ error: err.message });
    res.status(200).json(results);
  });
};

module.exports = {
  createAIPromptUsage,
  getAIPromptUsages
};
