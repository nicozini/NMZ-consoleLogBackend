const express = require('express');
const router = express.Router();
//const actorsAPIController = require('../../controllers/api/actorsAPIController');

//Rutas

//Listado de usuarios
router.get('/api/users/list', actorsAPIController.detail);
//Contar cantidad de usuarios
router.get('/api/users/count', actorsAPIController.list);
//Info usuario
router.get('/api/users/:id', actorsAPIController.list);

module.exports = router;