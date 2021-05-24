// Nivel: ruta
// Objetivo: Si el usuario esta registrado/logueado pero no en session, hago redirect a la vista login

function authMiddleware(req, res, next) {
    // Primero pregunto si NO hay algun unsuario en session
    if (!req.session.userLogged) {
        return res.redirect('/users/login');
    }
    next();
};

module.exports = authMiddleware;