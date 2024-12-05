const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const register = async (req, res) => {
  const { email, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, username, password: hashedPassword, role: 'worker' , uid: uuidv4()});
  await newUser.save();
  res.status(201).send('Usuario registrado');
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });
    const token = jwt.sign({ id: user._id, role: user.role }, 'secretKey');
    res.json({ token, role: user.role });
  } catch (error) {
    console.error('Error iniciando sesión:', error);
    res.status(500).json({ message: 'Error iniciando sesión' });
  }
};



const assignRole = async (req, res) => {
  const { role } = req.body;
  if (!['Responsable RRHH', 'Responsable Logistica', 'Responsable Produccion', 'Responsable Calidad'].includes(role)) {
    return res.status(400).send('Rol no válido');
  }
  await User.findByIdAndUpdate(req.params.id, { role });
  res.send('Rol asignado');
};


const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const createAdmin = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new User({
      email,
      username,
      password: hashedPassword,
      role: 'admin',
      uid: uuidv4()
    });
    await admin.save();
    res.status(201).send('Administrador creado');
  } catch (error) {
    console.error('Error creando administrador:', error);
    res.status(500).send('Error creando administrador');
  }
};

module.exports = {
  register,
  login,
  assignRole,
  getUsers,
  createAdmin
};



