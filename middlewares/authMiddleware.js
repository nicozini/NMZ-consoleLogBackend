// Nivel: ruta
// Objetivo del MD: Si el usuario esta registrado/logueado se lo derive a la vista login

function authMiddleware(req, res, next) {
    // Primero pregunto si hay algun unsuario en session
    if (!req.session.userLogged) {
        return res.redirect('/user/login');
    }
    next();


};

module.exports = authMiddleware;