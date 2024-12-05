const express = require('express');
const { createDepartamento, getDepartamentos, updateDepartamento, deleteDepartamento, addPuesto, deletePuesto } = require('../controllers/produccionController');

const router = express.Router();

router.post('/departamentos', createDepartamento);
router.get('/departamentos', getDepartamentos);
router.put('/departamentos/:id', updateDepartamento);
router.delete('/departamentos/:id', deleteDepartamento);

router.post('/departamentos/:id/puestos', addPuesto);
router.delete('/departamentos/:id/puestos/:puestoId', deletePuesto)

module.exports = router;
