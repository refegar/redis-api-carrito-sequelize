const express = require('express');
const { register, contacto,comprasConfirm} = require("../controllers/controller-register-mail");

const router = express.Router();

router.post("/register", register);
router.post("/contacto", contacto);
router.post("/comprasConfirm", comprasConfirm);

module.exports = router;