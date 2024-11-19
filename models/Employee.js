const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({

    NombreCompleto: { type: String, required: true },
    Estado: { type: String, enum: ['activo', 'baja_IT', 'baja_AT', 'desvinculado'], default: 'activo'},
    dni: { type: String, required: true, unique: true },
    NumeroSS: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    Telefono: { type: String },
    Direccion: { type: String },
    TipodeContrato: { type: String },
    CategoriaProfecional: { type: String },
    Salario: { type: Number },
    SuplementoSalarial: { type: Number, default: 0 },
    Historialabsentismo: [{ date: Date, reason: String }],
    idEmpresa: { type: Number},
    isActive: { type: Boolean, default: true },
    NumeroTarjeta: { type: Number},
    GrupoDescanso: { type: String },
    Departamento: { type: String },
    Puesto: { type: String }
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;