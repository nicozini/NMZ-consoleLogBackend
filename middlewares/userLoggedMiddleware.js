// Nivel: aplicación
// El objetivo de este middleware es que si no estoy logueado, aparezcan en header los links 
// para login y register, pero si estoy logueado que no aparezcan y aparezca el usuario en el header


const User = require('../models/Users');


function userLoggedMiddleware(req,res,next) {
    // Pregunto si hay alguien en session, si lo esta, le muestro una parte la la nav bar
    // Creo en locals el false para el usuario logueado (no está logueado)
    res.locals.isLogged = false;

    // Cookies: para ver si tengo un usuario y loguearlo automaticamente. Vengo del userController
    let emailInCookie = req.cookies.userEmail;
    // Me traigo el model para buscar al usuario con el mail de la cookie
    let userFromCookie = User.findByField('email', emailInCookie);
    // Pregunto si tengo un usuario y lo asigno a session como usuario logueado
    if (userFromCookie) {
        req.session.userLogged = userFromCookie;
    }


    if (req.session.userLogged) {
        res.locals.isLogged = true; 
        
        // Tambien paso lo que tengo en session a una variable local para utilizar en las vistas
        // Por ejemplo, para que en la nav bar cuando esta logueado aparezca su img y nombre (1h 34')
        res.locals.userLogged = req.session.userLogged;

    };

    next();
};

module.exports = userLoggedMiddleware;