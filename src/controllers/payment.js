// paymentController.js
const db = require('../config/db');

// Create Payment
const createPayment = (req, res) => {
  const { user_id, amount, payment_status } = req.body;
  db.query('INSERT INTO payments (user_id, amount, payment_status) VALUES (?, ?, ?)', [user_id, amount, payment_status], (err, result) => {
    if (err) return res.status(500).send({ error: err.message });
    res.status(201).send({ message: 'Payment created successfully', id: result.insertId });
  });
};

// Get all Payments
const getPayments = (req, res) => {
  db.query('SELECT * FROM payments', (err, results) => {
    if (err) return res.status(500).send({ error: err.message });
    res.status(200).json(results);
  });
};

module.exports = {
  createPayment,
  getPayments
};
