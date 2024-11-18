const path = require('path');
const db = require('../database/models');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Usuario = db.Usuarios;
const redisClient = require('../database/config/redisClient')

//Aqui hacen esto para lograr activalos operadores en sus querys (like - count - max) 
const Op = db.Sequelize.Op;
//Aquí requiero a la función que trae los errores desde la ruta, de llegar a existir
const { validationResult } = require('express-validator');

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

module.exports = {
 
    create: async (req, res) => {
        let errors = validationResult(req);
        
        if (errors.isEmpty()) {
          // Aquí defines los campos del usuario a guardar
          let newUser = {
            nombre: req.body.nombre,
            correo: req.body.correo,
            edad: req.body.edad,
            password: bcrypt.hashSync(req.body.password, 10),
          
          };
    
          try {
            // Insertar el usuario en la base de datos usando Sequelize
            await Usuario.create(newUser);  // 'usuario' debe coincidir con el nombre del modelo que configuraste en Sequelize
            res.send(newUser);
          } catch (error) {
            console.error('Error al crear usuario:', error);
            res.status(500).json({ error: 'Error al crear el usuario' });
          }
    
        } else {
          // Si hay errores, renderiza de nuevo el formulario con los errores y los datos anteriores
          return res.send('Erros peticion reguistro');
        }
    },
    ingresar: async (req, res) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
          // Devuelve un error si hay problemas de validación
          return res.status(400).json({ errors: errors.array() });
      }
  
      const { correo, password } = req.body;
  
      try {
          const usuarioLogueado = await Usuario.findOne({ where: { correo } });
  
          if (!usuarioLogueado) {
              return res.status(401).json({ error: "Usuario inválido" });
          }
  
          const isPasswordValid = await bcrypt.compare(password, usuarioLogueado.password);
          const nombre = usuarioLogueado.nombre
          if (!isPasswordValid) {
              return res.status(401).json({ error: "Contraseña no correcta" });
          }
  
          // Generar un token
          const token = jwt.sign({ correo }, JWT_SECRET, {
              expiresIn: JWT_EXPIRES_IN,
          });
  
          // Actualizar el token en la base de datos
          try {
              await Usuario.update(
                  { token },
                  {
                      where: { correo }
                  }
              );
          } catch (error) {
              console.error('Error al actualizar datos de usuario:', error);
              return res.status(500).json({ error: 'Error al actualizar el usuario.' });
          }
  
          // Enviar respuesta al cliente con el token y el correo
          return res.status(200).json({ message: "Inicio de sesión exitoso!", correo, token, nombre });
  
      } catch (error) {
          console.error('Error de logueo:', error);
          return res.status(500).json({ error: error.message });
      }
  },
  active: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const token = req.body.token;
    const correo = req.body.correo;

    const cachedProducts = await redisClient.get('sesionActiva');
            if (cachedProducts) {
              console.log('Usuario activo desde Redis');
              res.setHeader('X-Data-Source', 'redis');
              return res.json(JSON.parse(cachedProducts));
            }
      
    try {
        // Busca al usuario en la base de datos usando el correo y el token
        const sesionActiva = await Usuario.findOne({ 
            where: { correo, token } 
        });

        if (!sesionActiva) {
            return res.status(401).json({ error: "Usuario no está logueado o token inválido" });
        }

             // Guardar los productos en Redis con expiración
             await redisClient.set('sesionActiva', JSON.stringify(sesionActiva), 'EX', 3600); // Expira en 1 hora
             console.log('Sesion Activa almacenados en Redis');
             res.setHeader('X-Data-Source', 'database');
        // Devuelve un mensaje con el nombre del usuario
        res.status(200).json({ 
            message: 'Usuario activo correctamente', 
            nombre: sesionActiva.nombre ,
            correo: sesionActiva.correo
        });
    } catch (error) {
        console.error('Error al verificar la sesión del usuario:', error);
        res.status(500).json({ error: "Error del servidor" });
    }
},
clearCache:async(req,res)=>{
    try {
        // Eliminar la caché en Redis
        await redisClient.del('sesionActiva');
        console.log('Caché de sesion en Redis');
        return res.send('Caché eliminada');
      } catch (error) {
        console.error('Error eliminando caché:', error);
        return res.status(500).json({ error: error.message });
      }
}

}