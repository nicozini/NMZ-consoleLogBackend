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
            detail: `http://${req.headers.host}/api/products/${i.id}`
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
            meta:{
              status: 200,
              total : dataCountProduct,
              url : `http://${req.headers.host}/api/products`
            },
            data:{
              count: dataCountProduct,
              countByCategory:countByCategory,
              products :products
            }
          });
      })
 
    } catch(error){
      console.log(error);
      res.json({
        status : 500,
        detail : 'Error interno en la peticion de la información'
      })

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
            imgUrl:       `http://${req.headers.host}/img/${productInDb.images[0].name}`
          }
          return res.json({ 
            meta:{
              status: 200,
              total : productInDb.length,
              url :`http://${req.headers.host}/api/products/${productInDb.id}`
            },
            data: product });
        })
      .catch((error) => {
        console.log(error);
        res.json({
          status : 500,
          detail : 'Error interno en la peticion de la información'
        })
      });
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
    })
  },
  //fin Tomi
  lastProduct: async (req, res) => {
    try {
        let lastProductId = await Products.findOne({
            attributes: [[sequelize.fn('max', sequelize.col('id')), 'id']],
            raw: true
        });
        let product = await Products.findOne({where: {id: lastProductId.id}, include: ["images"]});

        let imgUrl = "http://" + req.headers.host + `/img/${productInDb.images[0].name}`;
        //http://${req.headers.host}/img/${productInDb.images[0].name}

        product.dataValues.urlImg = imgUrl;

        let respuesta = {
            meta: {
                status : 200,
                url: `api/lastProduct`
            },
            data: product
        }
        res.json(respuesta);
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
}
}

module.exports = productsAPIController;