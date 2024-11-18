const express = require('express');
const router = express.Router();
const path = require('path');

const controllersProducto = require(path.resolve(__dirname, '..', 'controllers', 'controllersProducto'));
const controllerCompras = require(path.resolve(__dirname, '..', 'controllers', 'controllerCompras'));
const controllerAddCart = require(path.resolve(__dirname, '..', 'controllers', 'controllersProducto'));


router.get('/productos', controllersProducto.index)
router.get('/detalleProducto/:nombre', controllersProducto.create)
router.post('/compras', controllerCompras.save)
router.post('/addCart', controllerAddCart.AddCart)
router.post('/cartProductos', controllerAddCart.cartProductos)
router.post('/AddCartNumber', controllerAddCart.AddCartNumber)
router.delete('/cartDelete/:id', controllerAddCart.deleteProducto)
router.delete('/cartAllDelete/:usuario', controllerAddCart.deleteAllProduct)
router.delete('/cleanCatch', controllerAddCart.clearCache)
module.exports = router;