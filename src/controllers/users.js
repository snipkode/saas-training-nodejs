const db = require('../config/db');

// Create User
const createUser = (req, res) => {
  const { name, email, password_hash } = req.body;
  db.query('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', [name, email, password_hash], (err, result) => {
    if (err) return res.status(500).send({ error: err.message });
    res.status(201).send({ message: 'User created successfully', id: result.insertId });
  });
};

// Get all Users
const getUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send({ error: err.message });
    res.status(200).json(results);
  });
};

// Get User by ID
const getUserById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send({ error: err.message });
    if (results.length === 0) return res.status(404).send({ message: 'User not found' });
    res.status(200).json(results[0]);
  });
};

// Update User
const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, password_hash } = req.body;
  db.query('UPDATE users SET name = ?, email = ?, password_hash = ? WHERE id = ?', [name, email, password_hash, id], (err, result) => {
    if (err) return res.status(500).send({ error: err.message });
    res.status(200).send({ message: 'User updated successfully' });
  });
};

// Delete User
const deleteUser = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
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
