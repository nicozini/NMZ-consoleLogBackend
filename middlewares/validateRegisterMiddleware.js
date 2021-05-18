const path = require('path');
const { body } = require('express-validator');

module.exports = [
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
    body ('avatar').custom((value, {req}) => {
        let file = req.file; 
        let acceptedExtensions = ['.jpg', '.png', '.gif']
        
        if (!file) {
            throw new Error ('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (acceptedExtensions.includes()) {
                throw new Error ('Las extenciones de Archivos permitidos son .jpg, .png y .gif')
            }
        }
    return true;
    })
]