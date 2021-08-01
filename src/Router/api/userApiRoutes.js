const express = require('express');
const router = express.Router();
const userApiController = require('../../controllers/api/userApiController');

//Rutas

//Listado de usuarios
router.get('/', userApiController.list);
//Info usuario
// router.get('/:id', userApiController.info);
router.get('/:id', userApiController.information);

module.exports = router;