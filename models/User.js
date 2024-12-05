const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{ type: String, required: true, unique: true},
    username: {type:String, required: true},
    password: {type:String, required: true},
    role: {type:String, enum: ['worker', 'Responsable RRHH', 'Responsable Logistica', 'Responsable Produccion', 'Responsable Calidad', 'admin'], default: 'worker' },
    uid: { type: String, unique: true, sparse: true }
});
const User = mongoose.model('User', userSchema);
module.exports = User;