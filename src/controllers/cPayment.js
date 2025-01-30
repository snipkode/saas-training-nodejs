// paymentController.js
const db = require('../config/db');
const midtransClient = require('midtrans-client');
require('dotenv').config();

// Initialize Midtrans client
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY
});

// Create Payment
const createPayment = (req, res) => {

  const user_id = req.user.userId;
  const { amount, payment_status, payment_type } = req.body;

  const transactionParams = createTransactionParams(user_id, amount, payment_type);

  snap.createTransaction(transactionParams)
    .then((transaction) => {
      const transactionToken = transaction.token;
      savePaymentToDatabase(user_id, amount, payment_status, transactionToken, payment_type, res);
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
};

const createTransactionParams = (user_id, amount, payment_type) => {
  const transactionParams = {
    transaction_details: {
      order_id: `order-${Date.now()}`,
      gross_amount: amount
    },
    customer_details: {
      user_id: user_id
    }
  };

  switch (payment_type) {
    case 'qris':
      transactionParams.payment_type = 'qris';
      break;
    case 'bank_transfer':
      transactionParams.payment_type = 'bank_transfer';
      transactionParams.bank_transfer = { bank: 'bca' }; // Change to other banks if needed
      break;
    default:
      transactionParams.credit_card = { secure: true };
  }

  return transactionParams;
};

const savePaymentToDatabase = (user_id, amount, payment_status, transactionToken, payment_type, res) => {
  db.query('INSERT INTO payments (user_id, amount, payment_status, transaction_token, payment_type) VALUES (?, ?, ?, ?, ?)', 
    [user_id, amount, payment_status, transactionToken, payment_type], 
    (err, result) => {
      if (err) return res.status(500).send({ error: err.message });
      res.status(201).send({ message: 'Payment created successfully', id: result.insertId, token: transactionToken });
    }
  );
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
