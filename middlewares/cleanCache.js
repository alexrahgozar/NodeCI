const { clearHash } = require("../services/cache");

// to skip a middleware in express

module.exports = async (req, res, next) => {
  await next();

  clearHash(req.user.id);
};
