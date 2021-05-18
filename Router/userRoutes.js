const express           = require('express');
const router            = express.Router()
const userController    = require('../controllers/userController');

console.log('entro en rutas de usuario');

//middlewares
const validations = require('../middlewares/validateRegisterMiddleware');
const uploadFile = require('../middlewares/multerMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');



// Formulario de registro
router.get('/register', guestMiddleware, userController.register);

// Procesar el registro
router.post('/register', uploadFile.single('avatar'), validations, userController.processRegister);


// Formulario de login
router.get('/login', guestMiddleware, userController.login);

// Procesar el login
router.post('/login',userController.processLogin);


// NOS QUEDA hacer esto de las user routes
// Perfil de Usuario
//router.get('/profile/', authMiddleware, userController.profile);

// Logout
//router.get('/logout/', userController.logout);

module.exports = router;