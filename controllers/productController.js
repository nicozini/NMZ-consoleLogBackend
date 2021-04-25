let fileOperations = require('../models/fileOperations'); 


module.exports = {
    
    // Traer listado de productos
    list: (req, res) => {
        let products = fileOperations.getProductList();
        res.render('products/productList', { products });
    },
    
    productCart:(req,res) => {    
        console.log('Entro en productCart');
        res.render('products/productCart');
    },
    
    productDetail: (req, res) => {
        let product = fileOperations.findById(req.params.id)
        res.render('products/productDetail', { product } )
    },

    productCreate: (req, res) => {
        res.render('products/productCreate')
  
    }
};
