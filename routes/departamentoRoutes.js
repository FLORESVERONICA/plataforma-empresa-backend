const express = require('express');
const { createDepartamento, getDepartamentos, updateDepartamento, deleteDepartamento, addPuesto, deletePuesto } = require('../controllers/departamentoController');

const router = express.Router();

router.post('/', createDepartamento);
router.get('/', getDepartamentos);
router.put('/:id', updateDepartamento);
router.delete('/:id', deleteDepartamento);

router.post('/:id/puestos', addPuesto);
router.delete('/:id/puestos/:puestoId', deletePuesto)

module.exports = router;
