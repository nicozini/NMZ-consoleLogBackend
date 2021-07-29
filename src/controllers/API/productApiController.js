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
          
          res.json({
            count: dataCountProduct,
            countByCategory:dataCountByCategory,
            products :dataProductInDb
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
      .then((product) => {
        return res.json(products);
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
    .then((products) => {
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