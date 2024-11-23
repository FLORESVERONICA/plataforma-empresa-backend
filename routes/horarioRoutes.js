const express = require("express");
const { generarCuadrante} = require ("../controllers/horarioController");

const router = express.Router();
router.get("/", generarCuadrante);

module.exports = router;