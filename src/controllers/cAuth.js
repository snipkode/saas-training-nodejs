const jwt = require('jsonwebtoken');
const db = require('../config/db');
const bcrypt = require('bcryptjs');

const secretKey = 'your_secret_key';

// Register User
const registerUser = (req, res) => {
  const { name, email, password } = req.body;
  const password_hash = bcrypt.hashSync(password, 8);
  const tenant_id = req.body.tenant_id || 1; // Default tenant_id to 1 if not provided

  db.query('INSERT INTO users (tenant_id, name, email, password_hash) VALUES (?, ?, ?, ?)', [tenant_id, name, email, password_hash], (err, result) => {
    if (err) return res.status(500).send({ error: err.message });
    res.status(201).send({ message: 'User registered successfully', id: result.insertId });
  });
};

// Login User
const loginUser = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).send({ error: err.message });
    if (results.length === 0) return res.status(404).send({ message: 'User not found' });

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password_hash);

    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ userId: user.id,  tenantId: user.tenant_id, roleId: user.role_id }, secretKey, { expiresIn: 86400 }); // 24 hours
    res.status(200).send({ auth: true, token });
  });
};

// Verify Token
const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // console.log("TOKEN DECODED VERIFY TOKEN FUNC", decoded);
    req.user = decoded;
    next();
  });
};

module.exports = {
  registerUser,
  loginUser,
  verifyToken
};
