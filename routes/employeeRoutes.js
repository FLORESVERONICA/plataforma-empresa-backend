const express = require("express");
const { createEmployee, getEmployees, getEmployeeById,  updateEmployeeDetails, updateEmployeeStatus } = require("../controllers/employeeController");
const router = express.Router();

router.post('/', createEmployee);
router.get('/', getEmployees);
router.get('/:id', getEmployeeById);
router.put('/:id', updateEmployeeDetails);
router.put('/:id/deactivate', updateEmployeeStatus);


module.exports = router;