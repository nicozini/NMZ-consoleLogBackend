// Express
const express = require('express');
const router = express.Router();

// Controller
const userController = require('../controllers/userController');

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware'); 
const formValidations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');



// Formulario de registro
router.get('/register', guestMiddleware, userController.register);

// Procesar el registro
router.post('/register', uploadFile.single('avatar'), formValidations, userController.processRegister);

// Formulario de login
router.get('/login', guestMiddleware, userController.login);

// Procesar el login
router.post('/login', userController.processLogin);



// NOS QUEDA hacer esto de las user routes
// Perfil de Usuario
//router.get('/profile/', authMiddleware, userController.profile);
router.get('/profile/', userController.profile);//saco temporalmente para probar la vista

// Logout
//router.get('/logout/', userController.logout);

module.exports = router;