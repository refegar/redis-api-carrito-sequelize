const express = require('express');
const path = require('path');
const router = express.Router();

const controllerUserAdmin = require(path.resolve(__dirname, '..', 'controllers', 'controllerUserAdmin'));
router.post("/usuario/create", controllerUserAdmin.create);
router.post("/login/validacion",controllerUserAdmin.ingresar);
router.post("/active/user",controllerUserAdmin.active);
router.delete("/active/clean",controllerUserAdmin.clearCache);


module.exports = router;