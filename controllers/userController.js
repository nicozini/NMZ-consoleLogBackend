console.log('entro en Controlador de usuario');
let userControler = {
    login:(req,res)=>{    
        res.render('users/login');
    },
    register:(req,res)=>{
        console.log('entro en método register');
        res.render('users/register');
    }
};

module.exports = userControler;