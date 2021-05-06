const express           = require('express');
const router            = express.Router()
const userController    = require('../controllers/userController');
const path = require ('path');
const { body } = require('express-validator');

console.log('entro en rutas de usuario');

const validations = [
    body('name').notEmpty() .withMessage('Completá el nombre'),
    body('lastname').notEmpty() .withMessage('Completá el apellido'),
    body('user').notEmpty() .withMessage('Completá el usuario'),
    body('dateBrith').notEmpty() .withMessage('Completá la fecha'),
    body('address').notEmpty() .withMessage('Completá la dirección'),
    body('numaddress').notEmpty() .withMessage('Completá el número'),
    body('floor').notEmpty() .withMessage('Completá el piso'),
    body('city').notEmpty() .withMessage('Completá la ciudad'),
    body('pass').notEmpty() .withMessage('Completá la contrasena'),
    body('confirmpass').notEmpty() .withMessage('Completá la contrasena'),
    body('email').notEmpty() .withMessage('Completá el correo electrónico'). bail ()
    .isEmail ()  .withMessage('Completá un correo electrónico válido'),
    body('idfiscal').notEmpty() .withMessage('Completá el ID'),
];

router.get('/register',userController.register);
router.post('/register', validations, userController.processRegister);


router.get('/login',userController.login);

module.exports = router;