const express           = require('express');
const router            = express.Router()
const userController    = require('../controllers/userController');

console.log('entro en rutas de usuario');

router.get('/register',userController.register);
router.get('/login',userController.login);

module.exports = router;