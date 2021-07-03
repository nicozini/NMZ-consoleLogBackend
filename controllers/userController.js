// Modelo o DB
// const User = require('../models/Users');
// let db = require('../src/database/model');
const db = require('../src/database/models');

// Modulos requeridos
const {	validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const { findByPk } = require('../models/Users');

// Funcionalidad userController
const userController = {
    
    // Registro (GET)
    register: (req, res) => {
        return res.render('users/register');    
    },

    // Registro (POST)
    processRegister: async (req, res) => {
        
        const resultValidation = validationResult(req);

        // Si hay errores, devolver data ingresada y validaciones
        if (resultValidation.errors.length > 0) {
            return res.render('users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        // Verifico que el email no este registrado caso contrario retorno error
        let userInDB = User.findByField('email', req.body.email);

        if (userInDB) {
            return res.render('users/register', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado.'
                    }
                },
                oldData: req.body
            });            
        }

        // Si paso las validaciones y el email no esta registrado, creo el usuario
       

        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            confirmpass: bcryptjs.hashSync(req.body.confirmpass, 10),
            avatar: req.file.filename
        };

        // try {
        //     let response = await db.User.create({
        //         first_name  : userToCreate.first_name,
        //         last_name   : userToCreate.last_name,
        //         email       : userToCreate.email,
        //         password    : userToCreate.password,
        //         avatar      : req.file.filename,
        //         addresses_id: 1 ,
        //         roll_id     : 1 
        //     })
        
        // };

        //res.json(await db.User.FindAll());
        //let userCreated = User.create(userToCreate);

        //return res.redirect('/users/login');
    },

    // Login (GET)    
    login:(req, res)=>{    
        return res.render('users/login');
    },

    // Login (POST) - Session de usuario
    processLogin: (req, res) => {

        // Verifico si el usuario está registrado
        let userToLogin = User.findByField('email', req.body.email);

        if (userToLogin) {
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (isOkThePassword) {
                // Guardo al usuario en Session pero borro su contraseña
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                // Creo una cookie para guardar el email, si el usuario opto por ser recordado
                if (req.body.remember) {
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60})
                }

                return res.redirect('/')
            }   
            return res.render('users/login', {
                errors: {
                    email: {
                        msg: 'Email o contraseña inválida'
                    }
                }
            })     
        }

        return res.render('users/login', {
            errors: {
                email: {
                    msg: 'Email no registrado'
                }
            }
        })
    },

    profile: (req,res) => {
        
        return res.render('users/profile', {
            user: req.session.userLogged
        });
    },

    updateProfile:(req,res) => {
        //Tomy
        const resultValidation = validationResult(req);
        let avatarN = req.session.userLogged.avatar ;
        let oldData = {...req.body,
                        avatar:avatarN};
                        
        if (resultValidation.errors.length > 0) {
            console.log(resultValidation.errors);
            return res.render('users/profile', {
                errors: resultValidation.mapped(),
                user:oldData  });
            
        } else{
            
            let userInDB = User.findByField('email', req.body.email);

            if (userInDB && userInDB.id != req.session.userLogged.id ) {
                return res.render('users/profile', {
                    errors: {
                        email: {
                            msg: 'Este email ya está registrado.'
                        }
                    },
                    user: oldData
                });            
            };

            if (req.file){
               avatarN =  req.file.filename
            }
            let userToUpdate = User.findByPk(req.session.userLogged.id)
            
            userToUpdate  = {
                id:    userToUpdate.id,
                name:  req.body.name,
                lastname    : req.body.lastname,
                email       : req.body.email,
                password    : userToUpdate.password,
                confirmpass : userToUpdate.confirmpass,
                agree       : userToUpdate.agree,
                avatar      : userToUpdate.avatar,
                newsletter  : req.body.newsletter
            }            
            
            if (User.update(req.session.userLogged.id,userToUpdate )){

                req.session.userLogged = userToUpdate;
                delete req.session.userLogged.password ;
                delete req.session.userLogged.confirmpass ;
                console.log('req.session.userLogged');
                console.log(req.session.userLogged);
            };
        }
        console.log('req.session.userLogged');
        console.log(req.session.userLogged);
        return res.redirect('/');
    },

    logout: (req,res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }
};

module.exports = userController;