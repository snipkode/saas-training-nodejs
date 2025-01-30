const db = require('../config/db');

// Get all Subscription Plans
const getSubscriptionPlans = (req, res) => {
  db.query('SELECT * FROM subscription_plans', (err, results) => {
    if (err) return res.status(500).send({ error: err.message });
    res.status(200).json(results);
  });
};

// Create Subscription Plan
const createSubscriptionPlan = (req, res) => {
  const { name, price, prompt_limit } = req.body;
  db.query('INSERT INTO subscription_plans (name, price, prompt_limit) VALUES (?, ?, ?)', [name, price, prompt_limit], (err, result) => {
    if (err) return res.status(500).send({ error: err.message });
    res.status(201).send({ message: 'Subscription plan created successfully', id: result.insertId });
  });
};

// Update Subscription Plan
const updateSubscriptionPlan = (req, res) => {
  const { id } = req.params;
  const { name, price, prompt_limit } = req.body;
  db.query('UPDATE subscription_plans SET name = ?, price = ?, prompt_limit = ? WHERE id = ?', [name, price, prompt_limit, id], (err, result) => {
    if (err) return res.status(500).send({ error: err.message });
    res.status(200).send({ message: 'Subscription plan updated successfully' });
  });
};

// Delete Subscription Plan
const deleteSubscriptionPlan = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM subscription_plans WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send({ error: err.message });
    res.status(200).send({ message: 'Subscription plan deleted successfully' });
  });
};

module.exports = {
  getSubscriptionPlans,
  createSubscriptionPlan,
  updateSubscriptionPlan,
  deleteSubscriptionPlan
};
