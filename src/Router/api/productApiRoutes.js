const express = require('express');
const router = express.Router();
//const actorsAPIController = require('../../controllers/api/actorsAPIController');

//Rutas

//Listado de productos
router.get('/api/products/list', actorsAPIController.detail);
//Contar cantidad de productos
router.get('/api/products/count', actorsAPIController.list);
//Contar cantidad de productos por categoría
router.get('/api/products/countbycategory', actorsAPIController.list);
//Info productos
router.get('/api/products/:id', actorsAPIController.list);

module.exports = router;