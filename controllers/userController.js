console.log('entro en Controlador de usuario');

const {validationResult, body} = require('express-validator');

const bcryptjs = require('bcryptjs');

const User = require('../models/Users');


// Funcionalidad userController
let userControler = {
    
    register:(req,res)=>{
        console.log('entro en método register');
        res.render('users/register');
    },
    processRegister: (req, res) => {
        const resultValidation = validationResult(req);
        
        if (resultValidation.errors.length > 0) {
            return res.render('userRegisterForm', {
                errors: resultValidation.mapped(),
                oldData: req.body(),
            });
        }
        return res.send ('Ok, las validaciones pasaron con éxito!')
    },        
        //return res.send(resultValidation);
        /*let user = {
            name: req.body.name,
            lastname: req.body.lastname,
            user: req.body.user,
            dateBrith: req.body.dateBrith,
            address: req.body.address,
            numaddress: req.body.numaddress,
            floor: req.body.floor,
            numFloor: req.body.numFloor,
            city: req.body.city,
            email: req.body.email,
            pass: req.body.pass,
            confirmpass: req.body.confirmpass,
            fiscalCondition: req.body.fiscalCondition,
            idfiscal: req.body.idfiscal,
        }
        */
        //guardarla


    // Nico: por get traigo la vista de Login    
    login:(req,res)=>{    
        res.render('users/login');
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
            return res.render('userLoginForm', {
                errors: {
                    email: {
                        msg: 'Error... las credenciales son inválidas'
                    }
                }
            });    
        }

        // userToLogin es undefined significa que no está ese email
        return res.render('userLoginForm', {
            errors: {
                email: {
                    msg: 'No se encuentra este email en nuestra base de datos'
                }
            }
        })
    }

    
};

module.exports = userControler;