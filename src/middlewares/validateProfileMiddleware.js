// Modulos requeridos
const path = require('path');
const { body } = require('express-validator');

module.exports = [

    body('first_name').notEmpty().withMessage('Completá el nombre').isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('last_name').notEmpty().withMessage('Completá el apellido').isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
    body('email').notEmpty().withMessage('Completá el correo electrónico').bail()
    .isEmail().withMessage('Debes completar con un correo electrónico válido')
]