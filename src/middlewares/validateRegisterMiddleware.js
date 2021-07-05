// Modulos requeridos
const path = require('path');
const { body } = require('express-validator');

module.exports = [

    body('name').notEmpty().withMessage('Completá el nombre'),
    body('lastname').notEmpty().withMessage('Completá el apellido'),
    body('email').notEmpty().withMessage('Completá el correo electrónico').bail()
                 .isEmail().withMessage('Debes completar con un correo electrónico válido'),
    body('password').notEmpty().withMessage('Completá la contraseña'),
    body('confirmpass').notEmpty().withMessage('Reconfirmá la contraseña'),
    body('agree').notEmpty().withMessage('Lee y confirma los terminos y condiciones del sitio'),
    // body('user').notEmpty() .withMessage('Completá el usuario'),
    // body('dateBrith').notEmpty() .withMessage('Completá la fecha'),
    // body('address').notEmpty() .withMessage('Completá la dirección'),
    // body('numaddress').notEmpty() .withMessage('Completá el número'),
    // body('floor').notEmpty() .withMessage('Completá el piso'),
    // body('city').notEmpty() .withMessage('Completá la ciudad'),
    // body('idfiscal').notEmpty() .withMessage('Completá el ID'),

    body('avatar').custom((value, { req }) => {
        // Obtengo el archivo
        let file = req.file; 

        // Defino que extensiones son válidas
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        
        if (!file) {
            throw new Error('Tienes que subir una imágen de perfil');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error ('Las extensiones de imágenes permitidas son .jpg, .png y .gif')
            }
        }
        // Siempre en las validaciones custom retorno true
        return true;
    })
]