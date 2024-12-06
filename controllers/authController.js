const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const User = require('../models/User');



const register = async (req, res) => {
  const { email, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, username, password: hashedPassword, role: 'worker', uid: uuidv4() });
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


    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Token generado:', token);
    
    req.session.token = token;

    res.json({ message: 'Inicio de sesión exitoso', token, role: user.role });
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
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
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
      uid: uuidv4(),
    });
    await admin.save();
    res.status(201).send('Administrador creado');
  } catch (error) {
    console.error('Error creando administrador:', error);
    res.status(500).send('Error creando administrador');
  }
};

const getUserInfo = async (req, res) => {

  try{
    const user = await User.findById(req.user.id);
    if(!user) {
      return res.status(404).json({ message: 'Usuario no encontrado'});
    }
    res.json({
      email: user.email,
      role: user.role,
    });

  } catch (error){
    console.error('Error obteniendo la informacion del usuario', error);
    res.status(500).json({ message: 'Error obteniendo la informacion del usuario'});

  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error al cerrar sesión' });
    }
    res.clearCookie('connect.sid'); 
    res.status(200).json({ message: 'Sesión cerrada exitosamente.' });
  });
};

module.exports = {
  register,
  login,
  assignRole,
  getUsers,
  createAdmin,
  getUserInfo,
  logout
};



