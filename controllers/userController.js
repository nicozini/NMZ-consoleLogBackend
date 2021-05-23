console.log('entro en Controlador de usuario');

const {
	validationResult
} = require('express-validator');
const bcryptjs = require('bcryptjs');
const User = require('../models/Users');


// Funcionalidad userController
    const userController = {
        //register, cuando entro
        register: (req, res) => {
            console.log('entro en método register');
            return res.render('users/register');
        },
        // process register (post)
        processRegister: (req, res) => {
            const resultValidation = validationResult(req);
            // si hay errores, volver a la data guardada
            if (resultValidation.errors.length > 0) {
                return res.render('users/register', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            }
            let userInDB = User.findByField('email', req.body.email);
            //si no hay errores, buscar login
            if (userInDB) {
                return res.render('users/register', {
                    errors: {
                        email: {
                            msg: 'Este email ya está registrado'
                        }
                    },
                    oldData: req.body
                });
            }
            let userToCreate = {
                ...req.body,
                password: bcryptjs.hashSync(req.body.password, 10),
                avatar: req.file.filename
            }
            let userCreated = User.create(userToCreate);
            return res.redirect('/user/login');
        },


    // Nico: por get traigo la vista de Login    
    login:(req,res)=>{    
        return res.render('users/login');
    },

    // Nico: por post proceso la informacion del logueo e inicio session
    processLogin: (req,res) => {
        // usuario logueado?
        let userToLogin = User.findByField('email', req.body.email);

        if (userToLogin) {
            // True. Verifico password y encripto
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

            // False. Muestro error generico
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
        res.render('login');
        
    },
    profile: (req,res) => {
        let userPrueba={
            first_name: "Lindie",
            last_name: "Camblin",
            email: "lcamblin0@shop-pro.jp",
            category: "user",
            image: "user_1.jpg",
            vegetarian: false
        }
        res.render('users/profile',{data:userPrueba})
    }
};

module.exports = userController;