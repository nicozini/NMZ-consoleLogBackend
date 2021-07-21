// Modulos requeridos
const path = require('path');
const { body } = require('express-validator');


module.exports = [
    body('name').notEmpty().withMessage('Completá el nombre').isLength({ min: 4 }),
    body('price').notEmpty().withMessage('Completá el precio'),
    body('description').notEmpty().withMessage('Completá la descripción').isLength({ min: 20 }),
    body('avProducts').custom((value, { req }) => {
        // Obtengo el archivo
        let file = req.file; 

        // Defino que extensiones son válidas
        let acceptedExtensions = ['.jpg', 'jpeg', '.png', '.gif'];
        
        if (!file) {
            throw new Error('Tienes que subir una imágen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error ('Las extensiones de imágenes permitidas son .jpg, .png y .gif')
            }
        }
        //Siempre en las validaciones custom retorno true
        return true;
    })
]