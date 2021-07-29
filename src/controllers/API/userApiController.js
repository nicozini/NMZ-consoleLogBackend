// Modelo o DB
const db = require('../database/models');

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
        let userInDB = await db.User.findOne({
            where:{
                email: req.body.email
            }
        });

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

        try {
            let response = await db.User.create({
                first_name  : userToCreate.name,
                last_name   : userToCreate.lastname,
                email       : userToCreate.email,
                password    : userToCreate.password,
                avatar      : req.file.filename,
                addresses_id: 1 ,
                roll_id     : 1 
            })
        
        } catch(err){
            res.send(err)
        };

        //let userCreated = User.create(userToCreate);

        return res.redirect('/users/login');
    },
    //metodo de test
    findAll:async (req,res)=>{
        res.json( await db.User.findAll());
    },
    // Login (GET)    
    login:(req, res)=>{    
        return res.render('users/login');
    },

    // Login (POST) - Session de usuario
    processLogin: async (req, res) => {

        // Verifico si el usuario está registrado
        //let userToLogin = User.findByField('email', req.body.email);
        let userToLogin = await db.User.findOne({
            where:{
                email: req.body.email
            }
        });

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
                    },
                    password: {
                        msg: 'Contraseña inválida'
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

    profile:async (req,res) => {
        let userLogged = req.session.userLogged
        await db.Address.findByPk(userLogged.addresses_id)
            .then((data)=>{
                userLogged= {
                    first_name  :userLogged.first_name,
                    last_name   :userLogged.last_name,
                    email       :userLogged.email,
                    avatar      :userLogged.avatar,
                    street      :data.street,
                    number      :data.number
                }
            })
        console.log(userLogged)
        return res.render('users/profile', {
            user: userLogged
        });

    },

    updateProfile:async (req,res) => {
        
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
            
            let userInDB = await db.User.findOne({
                where:{
                    email: req.body.email
                }
            });

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
            //const transaction = await sequelize.transaction();
            try {


                let userToUpdate    = await db.User.findByPk(req.session.userLogged.id);
                let prevAddress     = await db.Address.findByPk(userToUpdate.addresses_id);
                let updAddress = {
                    street : req.body.street,
                    number : req.body.number
                };
                
                if  ((prevAddress.street != updAddress.street) || (prevAddress.number != updAddress.number) ) {
                    if ( userToUpdate.addresses_id = 1 ){
                        //significa que tiene que insertar una nueva dirección
                        updAddress = await db.Address.create({
                            street : updAddress.street,
                            number : updAddress.number
                            });
                    }else{
                        //significa que tiene que actualizar la direccion con ese Id
                        updAddress = await db.Address.update({
                            street : req.body.street,
                            number : req.body.number
                            },
                            { where : { id: userToUpdate.addresses_id}
                             }
                             //,{transaction}
                             );
                    }
                };

                let idtemp = userToUpdate.id

                await db.User.update({
                    first_name   : req.body.first_name,
                    last_name    : req.body.last_name,
                    email        : req.body.email,
                    password     : userToUpdate.password,
                    addresses_id : updAddress.id != null ? updAddress.id : prevAddress.id
                    },
                    {
                        where:{ id:idtemp}
                    }
                    //,{transaction}
                    );

                await db.User.findByPk(userToUpdate.id)
                    .then((data)=>{
                        req.session.userLogged = data
                    })
                //borro la contraseña por seguridad
                delete req.session.userLogged.password ; 
                //await transaction.commit();
            }catch(err){
                res.send(err);
                //await transaction.commit();
            };
        }
        
        return res.redirect('/');
    },

    logout: (req,res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }
};

module.exports = userController;