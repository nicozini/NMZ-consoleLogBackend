const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

const uploadFileProducts = require('../middlewares/multerProductsMiddleware'); 
const formValidationsProducts = require('../middlewares/validateProductsMiddleware');
const formValidationsEditProducts = require('../middlewares/validateProductsEditMiddleware');


// Listado de productos
router.get("/", productController.list);

// Formulario de creación de productos (productCart.html)
router.get('/create', productController.productCreate);

// Acción de creación de producto nuevo en la DB
router.put('/:id', formValidationsEditProducts, productController.productSave);

// Guarda el nuevo producto Create (productCart.html)
router.post('/', uploadFileProducts.single('avProducts'), formValidationsProducts, productController.productSaveNew);

// Carrito de compras (productCart.html)
router.get('/productCart', productController.productCart);

// Ruta para mostrar búsqueda de productos
router.get('/search', productController.productSearch);


// Formulario de edición de productos
router.get('/:id/edit', productController.productEdit);


// Detalle de producto según :id
router.get("/:id", productController.productDetail);

// Ruta para eliminar productos
router.delete('/delete/:id', productController.productDelete);




module.exports = router;