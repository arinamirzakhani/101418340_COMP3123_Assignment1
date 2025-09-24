const { Router } = require('express');
const { body, oneOf } = require('express-validator');
const { validate } = require('../middleware/validate');
const ctrl = require('../controllers/user.controller');

const router = Router();

router.post(
  '/signup',
  validate([
    body('username').trim().notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
  ]),
  ctrl.signup
);

router.post(
  '/login',
  validate([
    oneOf([body('email').isEmail(), body('username').trim().notEmpty()], 'email or username is required'),
    body('password').notEmpty()
  ]),
  ctrl.login
);

module.exports = router;

