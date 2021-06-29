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
        db.Product.findAll({
            where: {
                name: { [Op.like ]: '%' + req.query.keyword + '%' }
            }
        })
        .then(products => {
            if (products.length > 0) {
                return res.json(products);                
            }
            return res.json('No existe stock del producto en este momento')
        })
    },
    
    // Isa
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
        //let product = fileOperations.findById(req.params.id)
        //res.render('products/productEdit', { product })         
            let pedidoProduct = db.Product.findByPK(req.params.id);
            let pedidoCategory = db.category.findAll();
            Promise.all([this.pedidoProduct, pedidoCategories])
                .then(function([products, categories]){
                    res.render("productEdit", {product:product, category:category})
                });
            res.redirect("/products");
        ;
            console.log(pedidoProduct);
            let products = await db.Product.findAll({
                include:[{association:"categories"}]
            });
            res.json(products);
        },
    productSave: (req, res) => {
        //Isa

        db.Product.create({
                name: req.body.name,
                price: req.body.price,
                stock: 100,
                stock_min: 50,
                stock_max: 150,
                categories_id: 1,
                description: req.body.description,
                week: 10,
                facts: req.body.facts
        });
        where: { 
            id: req.params.id
        };
        res.redirect("/products/" +req.params.id);
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
