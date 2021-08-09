const express = require('express');
const router = express.Router();
//const productApiController = require('../../controllers/api/productApiController');
const productApiController = require('../../controllers/API/productApiController')


//Rutas

//Listado de productos
router.get('/', productApiController.list);
//Info productos
router.get('/:id', productApiController.productDetail);

// Ultimo producto cargado en DB
router.get('/lastProduct', productApiController.lastProduct);

module.exports = router;