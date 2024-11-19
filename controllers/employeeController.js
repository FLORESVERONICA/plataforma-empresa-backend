const Employee = require("../models/Employee");

const createEmployee = async (req, res) => {
    try{
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).json({ message: 'Empleado creado exitosamente',employee });
    }catch (error) {
        res.status(400).json({ message: error.message })
    }
};

const getEmployees = async (req, res) => {
    try{
    const employees = await Employee.find();
    res.json(employees);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
};


const getEmployeeById = async (req, res) => {
    try{
     const employee = await Employee.findById(req.params.id);
     if(!employee) 
        return res.status(404).json({ message: 'Empleado no encontrado'});
     res.json(employee);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

const updateEmployeeDetails = async (req, res) => { 
    try { 
        console.log('Datos recibidos:', req.body);
        const { id } = req.params; 
        const employee = await Employee.findByIdAndUpdate(id, req.body, { new: true}); 
        if (!employee) { 
            return res.status(404).json({ message: 'Empleado no encontrado' }); 
        } 
        res.json({ message: 'Empleado actualizado', employee }); 
    } catch (error) { 
        res.status(500).json({ message: error.message }); 
    
    } 
};

const updateEmployeeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        // Aquí actualizas el campo "isActive" del trabajador a false
        const employee = await Employee.findByIdAndUpdate(
            id,
            { isActive: false, Estado: 'desvinculado' }, // Actualiza Estado y isActive
            { new: true } // Retorna el documento actualizado
        );

        if (!employee) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }

        res.json({ message: 'Empleado desvinculado', employee });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { createEmployee, getEmployees, getEmployeeById, updateEmployeeDetails, updateEmployeeStatus };