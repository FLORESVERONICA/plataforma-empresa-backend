const express = require('express');
const { createDepartamento, getDepartamentos, updateDepartamento, deleteDepartamento, addPuesto, deletePuesto, generarCuadrante } = require('../controllers/produccionController');

const router = express.Router();

router.post('/departamentos', createDepartamento);
router.get('/departamentos', getDepartamentos);
router.put('/departamentos/:id', updateDepartamento);
router.delete('/departamentos/:id', deleteDepartamento);


module.exports = router;
