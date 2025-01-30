const db = require('../config/db');

// Create AI Prompt Usage
const createAIPromptUsage = (req, res) => {
  const { prompt_text } = req.body;
  const user_id = req.user.userId;

  // Check subscription plan and prompt limit
  db.query('SELECT us.plan_id, sp.prompt_limit, us.end_date FROM user_subscriptions us JOIN subscription_plans sp ON us.plan_id = sp.id WHERE us.user_id = ? AND us.status = "active"', [user_id], (err, results) => {
    if (err) return res.status(500).send({ error: err.message });
    if (results.length === 0) return res.status(403).send({ message: 'No active subscription found' });

    const subscription = results[0];
    const currentDate = new Date();
    const endDate = new Date(subscription.end_date);

    if (currentDate > endDate) {
      return res.status(403).send({ message: 'Subscription plan has expired. Please renew your subscription.', subscription: subscription });
    }

    db.query('SELECT COUNT(*) AS prompt_count FROM ai_prompt_usage WHERE user_id = ?', [user_id], (err, countResults) => {
      if (err) return res.status(500).send({ error: err.message });

      const promptCount = countResults[0].prompt_count;
      if (promptCount >= subscription.prompt_limit) {
        return res.status(403).send({ message: 'Prompt limit exceeded. Upgrade your plan.', subscription: subscription});
      }

      // Insert new AI prompt usage
      db.query('INSERT INTO ai_prompt_usage (user_id, prompt_text) VALUES (?, ?)', [user_id, prompt_text], (err, result) => {
        if (err) return res.status(500).send({ error: err.message });
        res.status(201).send({ message: 'AI prompt usage created successfully', id: result.insertId });
      });
    });
  });
};

// Get all AI Prompt Usages by user
const getAIPromptUsages = (req, res) => {
  // console.log("check user data", req.user);
  const user_id         = req.user.userId;
  db.query('SELECT * FROM ai_prompt_usage WHERE user_id = ?', [user_id], (err, results) => {
    if (err) return res.status(500).send({ error: err.message });
    res.status(200).json(results);
  });
};

module.exports = {
  createAIPromptUsage,
  getAIPromptUsages
};
