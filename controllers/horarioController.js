const Departamento = require("../models/Departamento");
const Employee = require("../models/Employee");

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

  module.exports = { generarCuadrante }



