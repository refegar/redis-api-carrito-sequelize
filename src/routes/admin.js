const express = require('express');
const path = require('path');
const router = express.Router();

const controllerProductoAdmin = require(path.resolve(__dirname, '..', 'controllers', 'controllerProductoAdmin'));
router.post("/administrar/create", controllerProductoAdmin.save);
router.put('/administrar/edit/:id', controllerProductoAdmin.update);
router.delete('/administrar/delete/:id', controllerProductoAdmin.destroy);
module.exports = router;