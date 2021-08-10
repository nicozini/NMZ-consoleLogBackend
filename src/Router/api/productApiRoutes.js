const express = require('express');
const router = express.Router();
const productApiController = require('../../controllers/API/productApiController');


//Rutas

//Listado de productos
router.get('/', productApiController.list);
// Ultimo producto cargado en DB
router.get('/lastProduct', productApiController.lastProduct);
//Info productos
router.get('/:id', productApiController.productDetail);



module.exports = router;