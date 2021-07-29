const express = require('express');
const router = express.Router();
const productApiController = require('../../controllers/api/productApiController');

//Rutas

//Listado de productos
router.get('/list', productApiController.list);
// //Contar cantidad de productos
// router.get('/api/products/count', productApiController.list);
// //Contar cantidad de productos por categoría
// router.get('/api/products/countbycategory', productApiController.list);
//Info productos
router.get('/:id', productApiController.productDetail);

module.exports = router;