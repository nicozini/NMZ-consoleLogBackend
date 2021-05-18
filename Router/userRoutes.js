const express           = require('express');
const router            = express.Router()
const userController    = require('../controllers/userController');
const path = require ('path');
const { body } = require('express-validator');

console.log('entro en rutas de usuario');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
    cb(null, './public/usersAvatars');
    },
    filename : (req, file, cb) =>{
    let filename = '${Date.now()}_img${path.extname(file.originalname)}';
    cb(null, fileName);
    }
});

const uploadFile= multer({storage});

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
];

router.get('/register',userController.register);
router.post('/register', uploadFile.single('avatar'), validations, userController.processRegister);


// Registro
router.get('/register',userController.register);
router.post('/register', validations, userController.processRegister);

// Login - Inicio Sesión
router.get('/login',userController.login);
router.post('/login',userController.processLogin);



module.exports = router;