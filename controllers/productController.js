const fs = require('fs');
let fileOperations = require('../models/fileOperations');
let db = require('../src/database/models');
const Op = db.Sequelize.Op;
// const { Op } = require("sequelize");


module.exports = {
  list: (req, res) => {
    db.Product.findAll({
      include: ["categories"],
    })
      .then((products) => {
        res.render("products/productList.ejs", { products });
      })
      .catch((error) => res.send(error));
  },

  productCart: (req, res) => {
    res.render("products/productCart");
  },

  productDetail: (req, res) => {
    db.Product.findByPk(req.params.id, {
      include: ["categories", "images"],
    })
      .then((product) => {
        res.render("products/productDetail.ejs", { product });
      })
      .catch((error) => res.send(error));
  },

  productSearch: (req, res) => {
    let search = req.query.search;

    db.Product.findAll({
      where: {
        name: { [Op.like]: `%${search}%` },
      },
    })
    .then((products) => {
        if (products.length > 0) {
            return res.render('products/productSearch.ejs', { products });
            // return res.json(products);
        }
        return res.render('products/productSearch.ejs', { products });
    })
    .catch(function (e) {
        console.log(e);
    });
  },

  productSaveNew: async (req, res) => {
    let result = await db.Product.create({
      name: req.body.name,
      price: req.body.price,
      stock: 100,
      stock_min: 50,
      stock_max: 150,
      categories_id: 1,
      description: req.body.description,
      week: 10,
      facts: req.body.facts,
    });

    console.log(result);

    let products = db.Product.findAll({
      include: [{ association: "categories" }],
    });
    res.json(products);
  },

  productCreate: (req, res) => {
    res.render("products/productCreate");
  },

  productEdit: function(req, res) {
        let product = db.Product.findByPk(4)
        return res.render('products/productDetailEdit.ejs', { product });


    // //let product = fileOperations.findById(req.params.id)
    // //res.render('products/productEdit', { product })
    // let pedidoProduct = db.Product.findByPK(req.params.id);
    // // let pedidoCategory = db.category.findAll();

    // Promise.all([pedidoProduct])
    //     .then(function(products) {

    //         res.render("products/productEdit.ejs", {product:product, category:category})
    //     });

    // res.redirect("/products");

    // console.log(pedidoProduct);

    // // async y await tienen que estar juntos
    // let products = db.Product.findAll({
    //     include:[{association:"categories"}]
    // });

    // res.json(products);
  },

  productSave: (req, res) => {
    db.Product.create({
      name: req.body.name,
      price: req.body.price,
      stock: 100,
      stock_min: 50,
      stock_max: 150,
      categories_id: 1,
      description: req.body.description,
      week: 10,
      facts: req.body.facts,
    });
    where: {
      id: req.params.id;
    }
    res.redirect("/products/" + req.params.id);
  },

  productDelete: (req, res) => {
    db.Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.redirect("/products");
  }
};
