// api/users/:id
// ○ Deberá devolver un objeto literal con la siguiente estructura:
//          ■ Una propiedad por cada campo en base.
//          ■ Una URL para la imagen de perfil (para mostrar la imagen).
//          ■ Sin información sensible (ej: password y categoría).

const {	validationResult } = require('express-validator');

const fs = require('fs');
// let fileOperations = require('../models/fileOperations'); // NICO DEBERIA ELIMINAR YA NO SE USA
let db = require('../../database/models');
const Op = db.Sequelize.Op;
// const { Op } = require("sequelize");

module.exports = {
  list: async (req, res) => {
    try {
      let userInDb = await db.User.findAll({
        include: ["addresses","rolls"],
      });

      let users = [];

      userInDb.forEach(i => {
        users.push({
            id: i.id,
            name: i.name,
            email: i.email,
            url: `http://localhost:3030/api/users/${i.id}`
        })
      });

      let countUser = await db.User.count();
      
    Promise.all([userInDb,countUser])
      .then(([dataUserInDb, dataCountUser])=>{          
          res.json({
            count: dataCountUser,
            users: users
          });
      })
      .catch((error)=>{
        console.log(error)
      })
 
    } catch(error){
      res.send(error)
    };

  },

  // No tocar este método
  info: async (req, res) => {
    db.User.findByPk(req.params.id, {
      include: ["addresses"],
    })
      .then((user) => {
        return res.json(user);
      })
      .catch((error) => res.send(error));
  },

  // Metodo de testeo
  information: async (req, res) => {
    db.User.findByPk(req.params.id, {
      include: ["addresses"],
    })
      .then((user) => {
        return res.json({
          id: user.id,
          name: user.first_name,
          lastName: user.last_name,
          email: user.email,
          avatar: `http://localhost:3030/api/users/${user.avatar}`
        });
      })
      .catch((error) => res.send(error));
  },












  // userSearch: (req, res) => {
  //   let search = req.query.search;
  //   db.User.findAll({
  //     where: {
  //       name: { [Op.like]: `%${search}%` },
  //     },
  //     include: ["id","email"],
  //   })
  //   .then((users) => {
  //       if (users.length > 0) {
  //           return res.json(users);
  //       }
  //       return res.json(users);
  //   })
  //   .catch(function (e) {
  //       console.log(e);
  //   });
  // }
  
}