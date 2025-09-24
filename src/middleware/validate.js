const { validationResult } = require('express-validator');
exports.validate = (rules) => [
  ...rules,
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ status: false, message: 'Validation error', errors: result.array() });
    }
    next();
  }
];

