const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");


// Listado de productos
router.get("/", productController.list);

// Detalle producto
router.get("/:id/productDetail", productController.productDetail);

// Carrito de compras (productCart.html)
router.get('/productCart',productController.productCart);


module.exports = router;