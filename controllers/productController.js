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
        let products = fileOperations.getProductList();
        let nuevo = 0;
        products.forEach((i)=> {
            
            if (nuevo < i ) { nuevo = i} ;
            nuevo++
        });

        let nuevoProducto= {
            id : nuevo
        };

        res.render('products/productCreate',{ 'product': nuevoProducto })
    },

    productEdit: (req, res) => {
        let product = fileOperations.findById(req.params.id)
        res.render('products/productCreate', { product })
    },
    productSave: (req, res) => {
        let products = fileOperations.getProductList();
        
        products.forEach( (i)=> {
            if (i.id == req.params.id) {

                i.name = req.body.name
                i.price = req.body.price
                i.category = req.body.category
                i.description = req.body.description
                i.nutricion = req.body.nutricion
                i.facts = req.body.facts

                // if (req.body.in-sale === 'week'){
                //     products.week = true
                // };
            };
        });
        
        fileOperations.save(products)
        res.redirect('/product')
    }
};
