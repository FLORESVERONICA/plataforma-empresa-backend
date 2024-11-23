const mongoose = require('mongoose');

const puestoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  horario: [{
    inicio: { type: String, required: true },
    fin: { type: String, required: true },
  }],
});

const departamentoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  puestos: [puestoSchema],
});

const Departamento = mongoose.model('Departamento', departamentoSchema);

module.exports = Departamento;
