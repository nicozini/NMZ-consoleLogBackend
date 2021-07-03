const fs = require('fs');
let fileOperations = require('../models/fileOperations'); 
let db = require('../src/database/models');
const Op = db.Sequelize.Op;
// const { Op } = require("sequelize");


module.exports = {
    
    list: (req, res) => {

        db.Product.findAll({
            include: ['categories']
        })
            .then(products => {
                res.render('products/productList.ejs', {products})
            })
            .catch(error => res.send(error))
    },

    productCart:(req,res) => {    
        res.render('products/productCart');
    },
    
    productDetail: (req, res) => {
        db.Product.findByPk(req.params.id,
            {
                include : ['categories', 'images']
            })
            .then(product => {
                res.render('products/productDetail.ejs', {product});
            })
            .catch(error => res.send(error))
    },

    productSearch: (req, res) => {
        // let productSearch = req.query.search
        // VER HARCODEDO
        let search = 'coco'
        db.Product.findAll({
            where: {
                // name: { [Op.like]: '%' + productSearch + '%' }
                name: { [Op.like]: `%${search}%` } 
            }
        })
        .then(products => {
            if (products.length > 0) {
                return res.json(products);                
            }
            return res.json('No se encontró el producto buscado. Por favor, intente nuevamente.');
        })
        .catch(function(e) {
            console.log(e);
        })
    },
    
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
