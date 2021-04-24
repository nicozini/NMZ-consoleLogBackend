const express               = require('express');
const router                = express.Router()
const productController     = require('../controllers/productController');

//Carrito de compras (productCart.html)
router.get('/productCart',productController.productCart);
//Detalle del producto (productDetail.html)
router.get('/productDetail',productController.productDetail);

module.exports = router;