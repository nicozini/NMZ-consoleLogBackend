const {	validationResult } = require('express-validator');

const fs = require('fs');
// let fileOperations = require('../models/fileOperations'); // NICO DEBERIA ELIMINAR YA NO SE USA
let db = require('../../database/models');
const Op = db.Sequelize.Op;
// const { Op } = require("sequelize");

module.exports = {
  list: async (req, res) => {
    try {
      let productInDb = await db.Product.findAll({
        include: ["categories","images"],
      });
      let countProduct = await db.Product.count();
      let countByCategory= await db.Category.findAndCountAll({
        include: ["products"]
      });

      // findAndCountAll({
      //   include: [
      //      { model: Profile, required: true}
      //   ],
      //   limit: 3
      // });
      
      Promise.all([productInDb,countProduct,countByCategory])
      .then(([dataProductInDb,dataCountProduct,dataCountByCategory])=>{

        let products = [] ;
        dataProductInDb.forEach(i=> {
          products.push({
            id:i.id,
            name:i.name,
            description:i.description,
            images: i.images,
            detail:`https://verdumarket8.herokuapp.com/api/products/${i.id}`
          })
        });
        let countByCategory=[];
        dataCountByCategory.rows.forEach(i=>{
          countByCategory.push({
            name:i.name,
            productByCategory: i.products.length
          })
        })
          
          res.json({
            count: dataCountProduct,
            countByCategory:countByCategory,
            products :products
          });
      })
      .catch((error)=>{
        console.log(error)
      })
 
    } catch(error){
      res.send(error)
    };

  },
  //tomi
  productDetail: (req, res) => {
    
    db.Product.findByPk(req.params.id, {
      include: ["categories","images"],
    })
      .then((productInDb) => {
          let product = {
            id:           productInDb.id,
            name:         productInDb.name,
            price:        productInDb.price,
            stock:        productInDb.stock,
            stock_min:    productInDb.stock_min,
            stock_max:    productInDb.stock_max,            
            categories_id:productInDb.categories_id,            
            description:  productInDb.description,            
            week:         productInDb.week,            
            facts:        productInDb.facts,
            categories:   productInDb.categories,
            images:       productInDb.images,
            imgUrl:       `https://verdumarket8.herokuapp.com/img/${productInDb.images[0].name}`
          }
          return res.json({ product });
        })
      .catch((error) => res.send(error));
  },

  productSearch: (req, res) => {
    let search = req.query.search;
    db.Product.findAll({
      where: {
        name: { [Op.like]: `%${search}%` },
      },
      include: ["categories","images"],
    })
    .then((productsInDb) => {
        if (products.length > 0) {
          return res.json(products);
          // return res.json(products);
        }
        return res.json(products);
    })
    .catch(function (e) {
        console.log(e);
    });
  }
  //fin Tomi
  
};