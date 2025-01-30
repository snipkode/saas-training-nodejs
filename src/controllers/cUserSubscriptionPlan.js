// userSubscriptionController.js
const db = require('../config/db');

// Create User Subscription
const createUserSubscription = (req, res) => {
  const user_id = req.user.id;
  const { plan_id, start_date, end_date, status } = req.body;
  db.query('INSERT INTO user_subscriptions (user_id, plan_id, start_date, end_date, status) VALUES (?, ?, ?, ?, ?)', [user_id, plan_id, start_date, end_date, status], (err, result) => {
    if (err) return res.status(500).send({ error: err.message });
    res.status(201).send({ message: 'User subscription created successfully', id: result.insertId });
  });
};

// Get all User Subscriptions
const getUserSubscriptions = (req, res) => {
  const user_id = req.user.id;
  db.query('SELECT * FROM user_subscriptions WHERE user_id = ? LIMIT = 1', [user_id], (err, results) => {
    if (err) return res.status(500).send({ error: err.message });
    res.status(200).json(results);
  });
};

// Update User Subscription
const updateUserSubscription = (req, res) => {
  const { id } = req.params;
  const { user_id, plan_id, start_date, end_date, status } = req.body;
  db.query('UPDATE user_subscriptions SET user_id = ?, plan_id = ?, start_date = ?, end_date = ?, status = ? WHERE id = ?', [user_id, plan_id, start_date, end_date, status, id], (err, result) => {
    if (err) return res.status(500).send({ error: err.message });
    res.status(200).send({ message: 'User subscription updated successfully' });
  });
};

// Delete User Subscription
const deleteUserSubscription = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM user_subscriptions WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send({ error: err.message });
    res.status(200).send({ message: 'User subscription deleted successfully' });
  });
};

module.exports = {
  createUserSubscription,
  getUserSubscriptions,
  updateUserSubscription,
  deleteUserSubscription
};
