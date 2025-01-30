const db = require('../config/db');

const verifyTenant = async (req, res, next) => {
  try {
    const userId = req.user.id;
    db.query('SELECT tenantId FROM users WHERE id = ?', [userId], (err, results) => {
      if (err) return res.status(500).send('Internal server error');
      if (results.length === 0) return res.status(404).send('User not found');

      const tenantId = results[0].tenantId;
      const requestTenantId = req.body.tenantId || req.params.tenantId || req.query.tenantId;

      if (tenantId !== requestTenantId) {
        return res.status(403).send('Access denied');
      }

      next();
    });
  } catch (error) {
    res.status(500).send('Internal server error');
  }
};

module.exports = {
  verifyTenant,
};
