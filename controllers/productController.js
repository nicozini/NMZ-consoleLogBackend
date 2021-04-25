let fileOperations = require('../models/fileOperations'); 


module.exports = {
    
    // Traer listado de productos
    list: (req, res) => {
        let products = fileOperations.getProductList();
        res.render('products/productList', { products });
    },
    
    productCart:(req,res)=>{    
        console.log('Entro en productCart');
        res.render('products/productCart');
    },
    
    productDetail:(req,res)=>{
        res.send('DETALLE DE PRODUCTO SEGUN ID')
        // res.render('products/productDetail', { products });
    }


};