const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  console.log('Middleware de autenticación activado');

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Encabezado de autorización ausente o mal formado');
    return res.status(401).json({ message: 'Acceso denegado: Token no encontrado o inválido' });
  }

  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    console.log('Token no encontrado');
    return res.status(401).json({ message: 'Acceso denegado' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    console.log('Token verificado:', verified); 
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




