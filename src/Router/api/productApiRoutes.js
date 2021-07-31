const express = require('express');
const router = express.Router();
const productApiController = require('../../controllers/api/productApiController');

//Rutas

//Listado de productos
router.get('/list', productApiController.list);
//Info productos
router.get('/:id', productApiController.productDetail);

module.exports = router;