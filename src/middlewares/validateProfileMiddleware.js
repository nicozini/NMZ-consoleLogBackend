// Modulos requeridos
const path = require('path');
const { body } = require('express-validator');

module.exports = [

    body('first_name').notEmpty().withMessage('Completá el nombre'),
    body('last_name').notEmpty().withMessage('Completá el apellido'),
    body('email').notEmpty().withMessage('Completá el correo electrónico').bail()
    .isEmail().withMessage('Debes completar con un correo electrónico válido')
]