const db = require('../config/db');

// Create User
const createUser = (req, res) => {
  const { name, email, password_hash, tenantId } = req.body;
  db.query('INSERT INTO users (name, email, password_hash, tenantId) VALUES (?, ?, ?, ?)', [name, email, password_hash, tenantId], (err, result) => {
    if (err) return res.status(500).send({ error: err.message });
    res.status(201).send({ message: 'User created successfully', id: result.insertId });
  });
};

// Get all Users
const getUsers = (req, res) => {
  const tenantId = req.user.tenantId;
  db.query('SELECT * FROM users WHERE tenantId = ?', [tenantId], (err, results) => {
    if (err) return res.status(500).send({ error: err.message });
    res.status(200).json(results);
  });
};

// Get User by ID
const getUserById = (req, res) => {
  const { id } = req.params;
  const tenantId = req.user.tenantId;
  db.query('SELECT * FROM users WHERE id = ? AND tenantId = ?', [id, tenantId], (err, results) => {
    if (err) return res.status(500).send({ error: err.message });
    if (results.length === 0) return res.status(404).send({ message: 'User not found' });
    res.status(200).json(results[0]);
  });
};

// Update User
const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, password_hash } = req.body;
  const tenantId = req.user.tenantId;
  db.query('UPDATE users SET name = ?, email = ?, password_hash = ? WHERE id = ? AND tenantId = ?', [name, email, password_hash, id, tenantId], (err, result) => {
    if (err) return res.status(500).send({ error: err.message });
    res.status(200).send({ message: 'User updated successfully' });
  });
};

// Delete User
const deleteUser = (req, res) => {
  const { id } = req.params;
  const tenantId = req.user.tenantId;
  db.query('DELETE FROM users WHERE id = ? AND tenantId = ?', [id, tenantId], (err, result) => {
    if (err) return res.status(500).send({ error: err.message });
    res.status(200).send({ message: 'User deleted successfully' });
  });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
