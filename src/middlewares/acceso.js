const db = require('../database/models');
const Usuario = db.Usuarios;

module.exports = async (req, res, next) => {
    // Variable locals (super global - vive en las vistas)
    res.locals.usuario = false;
    
    // Verificar si hay un usuario en la sesión
    if (req.session.usuario) {
        res.locals.usuario = req.session.usuario;
        return next();
    } 
    
    // Si no hay usuario en la sesión, verificar si hay una cookie de correo
    else if (req.cookies.correo) {
        // Buscar el usuario en la base de datos usando el correo de la cookie
        let usuario = await Usuario.findOne({ where: { correo: req.cookies.correo } });
        
        if (usuario) {
            // Eliminar la contraseña antes de guardar
            delete usuario.password; 
            req.session.usuario = usuario; // Guardar en la sesión
            res.locals.usuario = usuario; // Pasar a la vista
        }
        
        return next();
    } else {
        return next();
    }
   

}
