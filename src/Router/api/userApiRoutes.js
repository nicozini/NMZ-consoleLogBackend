const express = require('express');
const router = express.Router();
const userApiController = require('../../controllers/api/userApiController');

//Rutas

//Listado de usuarios
router.get('/list', userApiController.list);
//Info usuario
// router.get('/:id', userApiController.info);

module.exports = router;