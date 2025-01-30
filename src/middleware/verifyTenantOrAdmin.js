const db = require('../config/db');

const verifyTenantOrAdmin = async (req, res, next) => {
  // Check if the user is the Tenant or an admin Roles
  console.log(req.user);
  
  if (req.user.roleId !== 2 && req.user.roleId !== 1) {
    return res.status(403).send({ message: 'You are not authorized to perform this action.' });
  }
  req.user = req.user;
  next();
};

module.exports = {
  verifyTenantOrAdmin,
};
