const path = require('path');
const db = require('../database/models');
const productosComprados = db.productosComprados;


module.exports = {
    save: async (req, res) => {
        const _body = {
          nombre: req.body.nombre,
          categoria: req.body.categoria,
          precio: req.body.precio,
          cantidad: req.body.cantidad,
          envio: req.body.envio,
          precioTotal: req.body.precioTotal,
          usuario: req.body.usuario,
        }
        try {
            productosComprados.create(_body)
            res.send(_body);
        } catch (error) {
            res.status(400).send('Error creando compra...',error)
        }
    }
};
