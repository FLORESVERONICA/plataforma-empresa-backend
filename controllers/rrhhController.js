const Employee = require("../models/Employee");
const Holiday = require('../models/Holiday');
const Departamento = require("../models/Departamento");

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
    const { id } = req.params;
    const { NumeroTarjeta, GrupoDescanso, Departamento, Puesto } = req.body;
  
    try {
      // Buscamos al empleado
      const employee = await Employee.findById(id);
      if (!employee) {
        return res.status(404).json({ message: "Empleado no encontrado" });
      }
  
      // Verificamos qué campos se pueden modificar
      const fieldsToUpdate = {};
  
      if (NumeroTarjeta && employee.canModify.NumeroTarjeta) {
        fieldsToUpdate.NumeroTarjeta = NumeroTarjeta;
      } else if (NumeroTarjeta) {
        return res.status(403).json({ message: "No puedes modificar el número de tarjeta desde aquí" });
      }
  
      if (GrupoDescanso && employee.canModify.GrupoDescanso) {
        fieldsToUpdate.GrupoDescanso = GrupoDescanso;
      } else if (GrupoDescanso) {
        return res.status(403).json({ message: "No puedes modificar el grupo de descanso desde aquí" });
      }
  
      if (Departamento && employee.canModify.Departamento) {
        fieldsToUpdate.Departamento = Departamento;
      } else if (Departamento) {
        return res.status(403).json({ message: "No puedes modificar el departamento desde aquí" });
      }
  
      if (Puesto && employee.canModify.Puesto) {
        fieldsToUpdate.Puesto = Puesto;
      } else if (Puesto) {
        return res.status(403).json({ message: "No puedes modificar el puesto desde aquí" });
      }
  
      // Actualizamos el empleado con los nuevos campos permitidos
      const updatedEmployee = await Employee.findByIdAndUpdate(id, fieldsToUpdate, { new: true });
  
      res.status(200).json({ message: "Empleado actualizado", updatedEmployee });
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

// Obtener todos los festivos
const getHolidays = async (req, res) => {
  try {
    const holidays = await Holiday.find();
    res.status(200).json(holidays);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los festivos.' });
  }
};

// Agregar un nuevo festivo
const addHoliday = async (req, res) => {
  const { date, type } = req.body;
  try {
    const newHoliday = new Holiday({ date, type });
    await newHoliday.save();
    res.status(201).json(newHoliday);
  } catch (error) {
    res.status(400).json({ error: 'Error al agregar el festivo.' });
  }
};

// Eliminar un festivo
const deleteHoliday = async (req, res) => {
  const { id } = req.params;
  try {
    await Holiday.findByIdAndDelete(id);
    res.status(200).json({ message: 'Festivo eliminado.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el festivo.' });
  }
};

const generarCuadrante = async (req, res) => {
  try {
    const { fecha } = req.query;
    const empleados = await Employee.find({ isActive: true})
    const departamentos = await Departamento.find();

    const cuadrante = [];

    empleados.forEach((empleado) => {
      const departamento = departamentos.find((dep) => dep.nombre === empleado.Departamento);
      if(departamento) {
        const puesto = departamento.puestos.find((p) => p.nombre === empleado.Puesto);
        if(puesto) {
          const estaDescanso = verificarDescanso(empleado.GrupoDescanso, fecha);
          if(!estaDescanso) {
            cuadrante.push ({
            nombre: empleado.NombreCompleto,
            departamento: departamento.nombre,
            puesto: puesto.nombre,
            horario: puesto.horario

            });
          }
        }
      }
    });
    res.status(200).json(cuadrante);
  } catch (error) {
      res.status(500).json({ message: error.message})
    }
  };

  const verificarDescanso = (grupoDescanso, fecha) => {
    return false;
  };


module.exports = { createEmployee, getEmployees, getEmployeeById, updateEmployeeDetails, updateEmployeeStatus,
  getHolidays, addHoliday, deleteHoliday,
  generarCuadrante
};