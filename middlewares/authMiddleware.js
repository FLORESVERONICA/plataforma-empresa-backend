const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
  console.log('Middleware de autenticación activado');
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    console.log('Token no encontrado');
    return res.status(401).json({ message: 'Acceso denegado' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    console.log('Token verificado:', verified); // Muestra el contenido del token
    next();
  } catch (error) {
    console.log('Error en la verificación del token:', error.message);
    return res.status(400).json({ message: 'Token no válido' });
  }
};

const adminMiddleware = (req, res, next) => {
  console.log('Rol del usuario:', req.user ? req.user.role : 'no definido');
  if (!req.user || req.user.role !== 'admin') {
    console.log('Acceso denegado: el usuario no tiene permisos de administrador');
    return res.status(403).json({ message: 'Acceso denegado' });
  }
  next();
};
module.exports = { authMiddleware, adminMiddleware };




