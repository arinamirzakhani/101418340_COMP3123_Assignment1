const { Router } = require('express');
const { body, param, query } = require('express-validator');
const { validate } = require('../middleware/validate');
const ctrl = require('../controllers/employee.controller');

const router = Router();

router.get('/employees', ctrl.list);

router.post('/employees',
  validate([
    body('first_name').trim().notEmpty(),
    body('last_name').trim().notEmpty(),
    body('email').isEmail(),
    body('position').trim().notEmpty(),
    body('salary').isFloat({ gt: -1 }),
    body('date_of_joining').isISO8601(),
    body('department').trim().notEmpty()
  ]),
  ctrl.create
);

router.get('/employees/:eid',
  validate([param('eid').isString().notEmpty()]),
  ctrl.getById
);

router.put('/employees/:eid',
  validate([param('eid').isString().notEmpty()]),
  ctrl.update
);

router.delete('/employees',
  validate([query('eid').isString().notEmpty()]),
  ctrl.remove
);

module.exports = router;
