const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");


// Listado de productos
router.get("/", productController.list);

// Product Create (productCart.html)
router.get('/productCreate', productController.productCreate);

// Guarda el nuevo producto Create (productCart.html)
router.post('/productSaveNew', productController.productSaveNew);

// Product Create (productCart.html)
router.get('/edit/:id', productController.productEdit);

router.put('/save/:id', productController.productSave);

// Detalle producto
router.get("/:id", productController.productDetail);

// Carrito de compras (productCart.html)
router.get('/productCart', productController.productCart);



module.exports = router;