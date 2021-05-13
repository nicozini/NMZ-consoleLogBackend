// Nivel: ruta
// Objetivo del MD: Si el usuario esta registrado no permitir que ingresar a login o register

function guestMiddleware(req, res, next) {
    // Primero pregunto si hay algun unsuario en session
    if (req.session.userLogged) {
        return res.redirect('/user/profile');
    }
    next();


};

module.exports = guestMiddleware;