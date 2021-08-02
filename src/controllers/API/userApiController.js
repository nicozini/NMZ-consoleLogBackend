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
            name: i.first_name,
            last_name: i.last_name,
            email: i.email,
            url: `https://verdumarket8.herokuapp.com/api/users/${i.id}`
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

  info: async (req, res) => {
    db.User.findByPk(req.params.id, {
      include: ["addresses"],
    })
      .then((user) => {
        return res.json({
          user_info: {
            id: user.id,
            name: user.first_name,
            lastName: user.last_name,
            email: user.email
          },
          user_avatar: `https://verdumarket8.herokuapp.com/api/users/${user.avatar}`
        });
      })
      .catch((error) => res.send(error));
  },
}