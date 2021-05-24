// Modelo o DB
const User = require('../models/Users');

// Modulos requeridos
const {	validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');



// Funcionalidad userController
const userController = {
    
    // Registro (GET)
    register: (req, res) => {
        return res.render('users/register');
    },

    // Registro (POST)
    processRegister: (req, res) => {
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
        }

        let userCreated = User.create(userToCreate);

        return res.redirect('/users/login');
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
            // Si el usuario esta logueado (true)
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);

            if (isOkThePassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                // Nico: ver cookie de recordame
                // if (req.body.remember_user) {
                //     res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) *2 });                    
                // }

                return res.redirect('/user/profile');                
            }    

            // Si el usuario no esta logueado (false)
            return res.render('login', {
                errors: {
                    email: {
                        msg: 'Error... las credenciales son inválidas'
                    }
                }
            });    
        }

        // userToLogin es undefined significa que no está ese email
        // return res.render('login', {
        // errors: {
        //         email: {
        //             msg: 'No se encuentra este email en nuestra base de datos'
        //         }
        //     }
        // })
        res.render('/users/login/');
        
    },
    profile: (req,res) => {
        let userPrueba={
            first_name: "Lindie",
            last_name: "Camblin",
            email: "lcamblin0@shop-pro.jp",
            category: "Usuario",
            image: "user_1.jpg",
            newsLetter: true
        }
        res.render('users/profile',{data:userPrueba})
    }
};

module.exports = userController;