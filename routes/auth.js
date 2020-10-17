//path: api/login

const {Router} = require('express');
const { check } = require('express-validator');
const { createUser, login, renewToken } = require('../controllers/auth');
const { validateData } = require('../middlewares/validated');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/new', [
  check('name', 'The name is required').not().isEmpty(),
  check('password', 'The password is required').not().isEmpty(),
  check('email', 'The email is required and valid').not().isEmpty().isEmail(),
  validateData  
], createUser);

router.post('/', [
  check('password', 'The password is required').not().isEmpty(),
  check('email', 'The email is required and valid').not().isEmpty().isEmail(),
], login);

router.get('/renew', validateJWT, renewToken);

module.exports =router;