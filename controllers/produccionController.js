
const Departamento = require('../models/Departamento');
const Employee = require('../models/Employee');

const createDepartamento = async (req, res) => {
try {
  const departamento = new Departamento(req.body);
  await departamento.save();
  res.status(201).json({ message: "Departamento creado exitosamente", departamento});
} catch ( error) {
  res.status(400).json({ message: error.message });
}
};

const getDepartamentos = async (req, res) => {
  try {
 
    const departamentos = await Departamento.find();
    res.status(200).json(departamentos);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar el departamento" });
  }
};

const updateDepartamento = async (req, res) => {
try {
  const { id } = req.params;
  const departamento = await Departamento.findByIdAndUpdate(id, req.body, { new: true });
  if (!departamento) {
    return res.status(404).json({ message: "Departamento no encontrado" });
  }
   res.status(200).json({ message: "departamento actualizado", departamento});
  
} catch( error) {
  res.status(500).json({ message: error.message });

}
};

const deleteDepartamento = async (req, res) => {
  try{
    const {id} = req.params;
    const departamentoEliminado = await Departamento.findByIdAndDelete(id);

    if (!departamentoEliminado) {
      return res.status(404).json({ message: "Departamento no encontrado"});
    }
    res.status(200).json({  message: 'Departamento eliminado correctamente' });

  } catch (error) {
    console.error('Error al eliminar departamento:', error);
    res.status(500).json({ message: 'Hubo un error al eliminar el departamento' });
  }
};


const addPuesto = async (req, res) => { 
  const departamentoId = req.params.id;
  const { nombre, horario } = req.body; 

  try { 
    const departamento = await Departamento.findById(departamentoId); 

    if (!departamento) { 
      return res.status(404).json({ message: 'Departamento no encontrado' }); 
    } 
    
    departamento.puestos.push({ nombre, horario }); 
    await departamento.save(); 
    
    res.status(201).json({ message: 'Puesto agregado exitosamente', departamento }); 

  } catch (error) { 
    res.status(500).json({ message: error.message }); 
  } 
};

const deletePuesto = async (req, res) => {
  const { id: departamentoId, puestoId } = req.params;

  try {
     const departamento = await Departamento.findById(departamentoId);

     if (!departamento) {
      return res.status(404).json({ message: "Departamento no encontrado" });
    }

    const puestoIndex = departamento.puestos.findIndex(puesto => puesto._id.toString() === puestoId);
    if (puestoIndex === -1) {
      return res.status(404).json({ message: "Puesto no encontrado en este departamento" });
    }

   departamento.puestos.splice(puestoIndex, 1);
    await departamento.save();
     res.status(200).json({ message: "Puesto eliminado correctamente" });
     
  } catch (error) {
    console.error('Error al eliminar el puesto:', error);
    res.status(500).json({ message: "Hubo un error al eliminar el puesto" });
  }
};




module.exports = {
  addPuesto,
  createDepartamento,
  getDepartamentos,
  updateDepartamento,
  deleteDepartamento,
  deletePuesto,

};
