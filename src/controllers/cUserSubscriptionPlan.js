// userSubscriptionController.js
const db = require('../config/db');

// Create User Subscription
const createUserSubscription = (req, res) => {
  const user_id = req.user.userId;
  const { plan_id, start_date, end_date, status } = req.body;
  const created_date = new Date();

  // Check if a subscription already exists and is active
  db.query('SELECT * FROM user_subscriptions WHERE user_id = ? AND status = "active" AND end_date >= CURDATE()', [user_id], (err, results) => {
    if (err) return res.status(500).send({ error: err.message });
    if (results.length > 0) return res.status(400).send({ message: 'An active subscription already exists for this user.' });

    // Create new subscription
    db.query('INSERT INTO user_subscriptions (user_id, plan_id, start_date, end_date, status, created_date) VALUES (?, ?, ?, ?, ?, ?)', [user_id, plan_id, start_date, end_date, status, created_date], (err, result) => {
      if (err) return res.status(500).send({ error: err.message });
      res.status(201).send({ message: 'User subscription created successfully', id: result.insertId });
    });
  });
};

// Get all User Subscriptions
const getUserSubscriptions = (req, res) => {
  const user_id = req.user.userId;
  db.query('SELECT * FROM user_subscriptions WHERE user_id = ? AND status = "active"', [user_id], (err, results) => {
    if (err) return res.status(500).send({ error: err.message });
    res.status(200).json(results);
  });
};

// Update User Subscription
const updateUserSubscription = (req, res) => {
  const { id } = req.params;
  const { user_id, plan_id, start_date, end_date } = req.body;

  // Check if the subscription is still active
  db.query('SELECT * FROM user_subscriptions WHERE id = ? AND status = "active" AND end_date >= CURDATE()', [id], (err, results) => {
    if (err) return res.status(500).send({ error: err.message });
    if (results.length === 0) return res.status(400).send({ message: 'Invalid update. The subscription is either expired or not active.' });

    // Update the subscription
    db.query('UPDATE user_subscriptions SET user_id = ?, plan_id = ?, start_date = ?, end_date = ? WHERE id = ?', [user_id, plan_id, start_date, end_date, id], (err, result) => {
      if (err) return res.status(500).send({ error: err.message });
      res.status(200).send({ message: 'User subscription updated successfully' });
    });
  });
};

// Soft Delete User Subscription
const deleteUserSubscription = (req, res) => {
  const { id } = req.params;

  // Check if the subscription is already canceled
  db.query('SELECT * FROM user_subscriptions WHERE id = ? AND status = "cancelled"', [id], (err, results) => {
    if (err) {
      console.error('Error checking subscription status:', err);
      return res.status(500).send({ error: err.message });
    }
    if (results.length > 0) {
      console.log('Subscription already canceled:', results);
      return res.status(400).send({ message: 'The subscription is already canceled.' });
    }

    // Cancel the subscription
    db.query('UPDATE user_subscriptions SET status = "cancelled" WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error('Error updating subscription status:', err);
        return res.status(500).send({ error: err.message });
      }
      console.log('Subscription canceled successfully:', result);
      res.status(200).send({ message: 'User subscription cancelled successfully' });
    });
  });
};

module.exports = {
  createUserSubscription,
  getUserSubscriptions,
  updateUserSubscription,
  deleteUserSubscription
};
