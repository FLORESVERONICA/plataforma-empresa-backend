const express = require("express");
const { createEmployee, getEmployees, getEmployeeById,  updateEmployeeDetails, updateEmployeeStatus,  getHolidays, addHoliday, deleteHoliday,
    generarCuadrante, } = require("../controllers/rrhhController");
const router = express.Router();

router.post('/employee', createEmployee);
router.get('/employee', getEmployees);
router.get('/employee/:id', getEmployeeById);
router.put('employee/:id', updateEmployeeDetails);
router.put('/employee/:id/deactivate', updateEmployeeStatus);
router.get('/holidays', getHolidays);
router.post('/holidaiys', addHoliday);
router.delete('/holidays/:id', deleteHoliday);
router.get("/horario", generarCuadrante);


module.exports = router;