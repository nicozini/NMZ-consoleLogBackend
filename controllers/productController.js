const fs = require('fs');
let fileOperations = require('../models/fileOperations'); 
let db = require('../src/database/models');


module.exports = {
    // Traer listado de productos
    //Nico
    list: async (req, res) => {

        let products = [];

        // let products = await db.Product.findAll({
        //     include: [{association:"categories"}]
        // });

        res.render('products/productList', { products });
    },



    productCart:(req,res) => {    
        res.render('products/productCart');
    },
    
    productDetail: (req, res) => {
        //Nico
        let product = fileOperations.findById(req.params.id)
        res.render('products/productDetail', { product } )
    },
    
    // productSaveNew:(req, res) => {
    //     //Isa
    //     let products = fileOperations.getProductList();
    //     var nuevoId = 0;
        
    //     console.log(products);
        

    //     products.forEach((i)=> {
            
    //         if ( nuevoId < i.id ) {
    //             nuevoId = i.id
    //             console.log('nuevoid');
    //             console.log(nuevoId) ;
    //         };
            
    //     });

    //     nuevoId++
        

    //     let nuevoProducto= {
    //         id : nuevoId,
    //         name : req.body.name,
    //         price : req.body.price,
    //         category : req.body.category,
    //         description : req.body.description,
    //         nutricion : req.body.nutricion,
    //         facts : req.body.facts
    //     };

    //     fileOperations.saveNew(nuevoProducto)
    //     res.redirect('/products')
    // },

    productSaveNew: async (req,res) => {

        let result = await db.Product.create({
            name: req.body.name,
            price: req.body.price,
            stock: 100,
            stock_min: 50,
            stock_max: 150,
            categories_id: 1,
            description: req.body.description,
            week: 10,
            facts: req.body.facts
        })

        console.log(result);

        let products = await db.Product.findAll({
            include:[{association:"categories"}]
        });

        res.json(products);
    },


    productCreate: (req, res) => {
        res.render('products/productCreate')
    },

    productEdit: (req, res) => {
        //Isa
        let product = fileOperations.findById(req.params.id)
        res.render('products/productEdit', { product })
    },

        /* editar : function (req, res) {
            let pedidoPelicula = db.Pelicula.findByPK(req.params.id);
            let pedidoGeneros = db.Genero.findAll();
            Promise.all([pedidoPelicula, pedidoGeneros])
                .then(function([pelicula, generos]){
                    res.render("editarPelicula", {pelicula:pelicula, generos:generos})
                }

            });
            res.redirect("/peliculas");
        },
        listado: function (req, res) {
            db.Pelicula.findAll(
                .then(function("listadoPeliculas", {peliculas:peliculas}))
            )
        }
        */
    productSave: (req, res) => {
        //Isa
        let products = fileOperations.getProductList();

        /* guardado : function (req, res) {
            db.Pelicula.create({
                title:req.body.titulo,
                etc...
            });
            where: { 
                id: req.params.id
            }
            
        });
        res.redirect("/peliculas/" +req.params.id)
        */
        
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
        res.redirect('/products')
    },

     productDelete: (req,res) => {
         //Isa por aca min '49 CRUD!
         let products = fileOperations.getProductList();
         let productsNew = products.filter(i => i.id != req.params.id);
    
        // res.send(productsNew);
        fileOperations.save(productsNew)

        res.redirect('/products')
        
     },

    productDeleteN: function (req,res) {
        let idToDelete = req.params.id;
        let products = fileOperations.delete(idToDelete); 
        return res.redirect('/products');       
    }

};
