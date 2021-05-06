console.log('entro en Controlador de usuario');
const {validationResult} = require('express-validator');
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

    login:(req,res)=>{    
        res.render('users/login');
    }
};

module.exports = userControler;