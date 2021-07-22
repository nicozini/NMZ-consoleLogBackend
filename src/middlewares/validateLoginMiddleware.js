// Modulos requeridos
const path = require('path');
const { body } = require('express-validator');

module.exports = [

    body('email').notEmpty().withMessage('Completá el correo electrónico').bail()
                 .isEmail().withMessage('Debes completar con un correo electrónico válido'),
    body('password').notEmpty().withMessage('Completá la contraseña').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('agree').notEmpty().withMessage('Lee y confirma los terminos y condiciones del sitio')
    
]