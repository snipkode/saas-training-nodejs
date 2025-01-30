const db = require('../../config/db');

const verifyTenant = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const tenantFromAuth = req.user.tenantId;
    db.query('SELECT tenantId FROM users WHERE id = ?', [user_id], (err, results) => {
      if (err) return res.status(500).send('Internal server error');
      if (results.length === 0) return res.status(404).send('User not found');

      const tenantId = results[0].tenantId;
      const requestTenantId = tenantFromAuth;

      if (tenantId !== requestTenantId) {
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
