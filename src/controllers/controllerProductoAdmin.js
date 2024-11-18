const path = require('path');
const db = require('../database/models');
const { DATE } = require('sequelize');
const Product = db.productos;
const Category = db.create;
//Aqui hacen esto para lograr activalos operadores en sus querys (like - count - max) 
const Op = db.Sequelize.Op;

//Esto es otra forma de declarar los Modelos en nuestro controlador
//const Product = db.Product; 
//const Category = db.category;
//const TipoPago = db.TipoPago;
//const {Product,Category,TipoPago} = require('../database/models');


module.exports = {
 
    save: async (req, res) => {
        console.log("Contenido de req.body:", req.body); // Verificar si llegan los datos
        const _body = { 
            nombre: req.body.nombre,
            categoria: req.body.categoria,
            precio: req.body.precio,
            image: `image-${Math.floor(Date.now() / 1000)}`
        };
        try {
            await Product.create(_body);
            res.send(_body);
        } catch (error) {
            console.log('Error al crear producto:', error);
            res.status(500).send(error);
        }
    }
,    
    show: (req,res)=>{
        Product.findByPk(req.params.id, {
            include : [{association : 'category'}]
        })  
        .then(miReloj =>{
            res.render(path.resolve(__dirname, '..','views','admin','detail'), {miReloj})
        })  
        .catch(error => res.send(error))
    },
    destroy: (req,res) =>{
        Product.destroy({
            where: {
                id : req.params.id
            }
        })
        .then(()=>  res.send(`Producto fue eliminado correctamente`))
        .catch(error => res.send(error))
    },
    update: async (req,res) =>{
        const _body ={
            id: req.body.id,
            nombre: req.body.nombre,
            categoria: req.body.categoria,
            precio: req.body.precio,
            image: `image-${Math.floor(Date.now() / 1000)}`
        };
      try {
       await  Product.update (_body, {
            where: {
                id:req.params.id
           }
        })
        res.send(_body)
      } catch (error) {
        console.log('Error al Editar producto:', error);
        res.status(500).send(error);
      }
            
    },
    search: ( req, res) =>{
        Product.findAll({
            include : [{association : 'category'}],
            where:{
                name: {[Op.like]: `%${req.query.search}%`}
            }
        })
        .then(resultado => { res.render(path.resolve(__dirname, '..', 'views', 'admin', 'administrar'),{relojes: resultado});})
        .catch(error => res.send(error))
    }


}