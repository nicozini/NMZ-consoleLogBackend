const express = require('express');
const router = express.Router();
const productApiController = require('../../controllers/API/productApiController');


//Rutas
// Ultimo producto cargado en DB
router.get('/lastProduct', productApiController.lastProduct);
//Listado de productos
router.get('/', productApiController.list);
//Info productos
router.get('/:id', productApiController.productDetail);



module.exports = router;