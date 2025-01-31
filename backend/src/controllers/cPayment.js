// paymentController.js
const db = require('../config/db');
const midtransClient = require('midtrans-client');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

// Initialize Midtrans client
const snap = new midtransClient.Snap({
  isProduction: process.env.NODE_ENV === 'production',
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY
});

// Validation rules
const paymentValidationRules = [
  body('amount').isInt({ min: 1000 }).withMessage('Amount minimum Rp 1.000'),
  body('payment_type').isIn(['credit_card', 'qris', 'bank_transfer'])
    .withMessage('Invalid payment type')
];

// Create Payment
const createPayment = (req, res) => {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user_id = req.user.userId;
  const { amount, payment_type } = req.body;
  
  // Generate unique order ID
  const order_id = `order-${uuidv4()}`;
  
  // Create transaction parameters
  const transactionParams = {
    transaction_details: {
      order_id,
      gross_amount: amount
    },
    customer_details: {
      user_id: user_id.toString()
    }
  };

  // Add payment method specific parameters
  switch (payment_type) {
    case 'qris':
      transactionParams.payment_type = 'qris';
      break;
    case 'bank_transfer':
      transactionParams.payment_type = 'bank_transfer';
      transactionParams.bank_transfer = { bank: 'bca' };
      break;
    default:
      transactionParams.credit_card = { 
        secure: true,
        save_card: false
      };
  }

  // Create Midtrans transaction
  snap.createTransaction(transactionParams)
    .then((transaction) => {
      // Save to database
      db.query(
        `INSERT INTO payments 
         (user_id, order_id, amount, payment_status, payment_type, transaction_token) 
         VALUES (?, ?, ?, 'pending', ?, ?)`,
        [user_id, order_id, amount, payment_type, transaction.token],
        (err, result) => {
          if (err) {
            console.error('Database Error:', err);
            return res.status(500).json({
              success: false,
              message: 'Payment processing failed',
              error: err.message
            });
          }

          res.status(201).json({
            success: true,
            message: 'Payment initiated',
            payment_data: {
              order_id,
              token: transaction.token,
              redirect_url: transaction.redirect_url
            }
          });
        }
      );
    })
    .catch((err) => {
      console.error('Payment Error:', err);
      res.status(500).json({
        success: false,
        message: 'Payment processing failed',
        error: err.message
      });
    });
};

// Handle Midtrans Notification
const handleNotification = (req, res) => {
  const { order_id, transaction_status, fraud_status } = req.body;
  
  // Validate transaction
  let payment_status = 'pending';
  if (transaction_status === 'capture' && fraud_status === 'accept') {
    payment_status = 'success';
  } else if (transaction_status === 'settlement') {
    payment_status = 'success';
  } else if (['deny', 'expire', 'cancel'].includes(transaction_status)) {
    payment_status = 'failed';
  }

  db.query(
    `UPDATE payments 
     SET payment_status = ? 
     WHERE order_id = ?`,
    [payment_status, order_id],
    (err, result) => {
      if (err) {
        console.error('Notification Error:', err);
        return res.status(500).json({ error: err.message });
      }

      res.status(200).send('OK');
    }
  );
};

// Get Payment History
const getPayments = (req, res) => {
  const user_id = req.user.userId;
  db.query(
    `SELECT 
      order_id, 
      amount, 
      payment_status, 
      payment_type, 
      payment_date 
     FROM payments 
     WHERE user_id = ? 
     ORDER BY payment_date DESC`,
    [user_id],
    (err, results) => {
      if (err) {
        console.error('Fetch Payments Error:', err);
        return res.status(500).json({
          success: false,
          message: 'Failed to fetch payments'
        });
      }

      res.status(200).json({
        success: true,
        data: results
      });
    }
  );
};

module.exports = {
  paymentValidationRules,
  createPayment,
  handleNotification,
  getPayments
};