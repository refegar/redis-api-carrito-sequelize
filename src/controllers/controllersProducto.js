const path = require('path');
const db = require('../database/models');
const redisClient = require('../database/config/redisClient')
const Product = db.productos;
const AddCart = db.productosCarritos;
const Op = db.Sequelize.Op;

module.exports = {
    index: async (req, res)=> {
        try {
            // Buscar en Redis primero
            const cachedProducts = await redisClient.get('products');
            if (cachedProducts) {
              console.log('Productos obtenidos desde Redis');
              res.setHeader('X-Data-Source', 'redis');
              return res.json(JSON.parse(cachedProducts));
            }
      
            // Si no están en Redis, consultar la base de datos
            const products = await Product.findAll();
      
            // Guardar los productos en Redis con expiración
            await redisClient.set('products', JSON.stringify(products), 'EX', 3600); // Expira en 1 hora
            console.log('Productos almacenados en Redis');
            res.setHeader('X-Data-Source', 'database');
            return res.json(products);
          } catch (error) {
            console.error('Error obteniendo productos:', error);
            return res.status(500).json({ error: error.message });
          }
      },
      AddCart:async(req,res)=>{
        let _body = {
            nombre:req.body.nombre,
            usuario:req.body.usuario,
            categoria:req.body.categoria,
            descripcion:req.body.descripcion,
            precio:req.body.precio,
            cantidad:req.body.cantidad,
            image:req.body.image
        }
        try {
            await AddCart.create(_body);
            await redisClient.del('cartProductos');
            res.send(_body)
        } catch (error) {
           res.status(500).json({error: error.message})
        }
      },
      AddCartNumber: async (req, res) => {
        const usuario = req.body.usuario;
    
        try {
            const cantidadRegistro = await AddCart.count({
                where: { usuario }
            });
            res.send(cantidadRegistro.toString()); // Envía solo el número como una cadena
        } catch (error) {
            console.error('Error al contar registros:', error); // Log para depuración
            res.status(500).send('Error al contar registros: ' + error.message); // Asegurar que sea una cadena
        }
    },    
      cartProductos: async(req,res)=>{
        const usuario = req.body.usuario
       try {
          // Buscar en Redis primero
          const cachedProducts = await redisClient.get('cartProductos');
          if (cachedProducts) {
            console.log('Productos carrito obtenidos desde Redis');
            res.setHeader('X-Data-Source', 'redis');
            return res.json(JSON.parse(cachedProducts));
          }
       const cartProductos = await AddCart.findAll({where: {usuario}})

        // Guardar los productos en Redis con expiración
        await redisClient.set('cartProductos', JSON.stringify(cartProductos), 'EX', 3600); // Expira en 1 hora
        console.log('Productos carrito almacenados en Redis');
        res.setHeader('X-Data-Source', 'database');
        res.status(200).send(cartProductos)
       } catch (error) {
        res.status(500).send('Error mostra producto carrito')
       }
      },
      deleteProducto: async(req,res)=>{
      try {
        AddCart.destroy({
            where: {
                id : req.params.id
            }
        })
        await redisClient.del('cartProductos');
        res.status(200).send('Borrado exitoso!')
      } catch (error) {
        res.status(500).send('Error a eliminar producto',error)
      }
      },
      deleteAllProduct: async(req,res)=>{
        const usuario = req.params.usuario
       try {
        AddCart.destroy({
            where:{usuario}
        })
        await redisClient.del('cartProductos');
        res.status(200).send('Borrado total exitoso!')
       } catch (error) {
        res.status(500).send('error al borrar productos',error)
       }
      },
    create: async (req, res) => {

        const _body = {
            nombre:req.params.nombre
        }
        try {
           const Productodetalle= await Product.findOne({
            where:_body
           })
            res.json(Productodetalle) // Envía los productos en formato JSON
            
        } catch (error) {
          console.log('error verificacion de usuario')
          res.status(500).json({ error: error.message }); // Manejador de errores
        }
     
    },
    clearCache:async(req,res)=>{
        try {
            // Eliminar la caché en Redis
            await redisClient.del('cartProductos');
            console.log('Caché de productos eliminada en Redis');
            return res.send('Caché eliminada');
          } catch (error) {
            console.error('Error eliminando caché:', error);
            return res.status(500).json({ error: error.message });
          }
    }
};
