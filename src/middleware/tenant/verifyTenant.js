const db = require('../../config/db');

const verifyTenant = async (req, res, next) => {
  try {
    
    const tenantId = req.user.tenantId;
    db.query('SELECT id FROM tenants WHERE id = ?', [tenantId], (err, results) => {
      if (err) return res.status(500).send('Internal server error');
      if (results.length === 0) return res.status(404).send('Tenant not found');

      const id = results[0].id;

      if (tenantId !== id) {
        return res.status(403).send('Access denied');
      }
      req.user = req.user;
      next();
    });
  } catch (error) {
    res.status(500).send('Internal server error');
  }
};

module.exports = {
  verifyTenant,
};
