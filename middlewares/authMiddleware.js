const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Usar el token de la sesión de Express
  const token = req.session.token;

  if (!token) {
    return res.status(401).send('No autorizado');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Adjuntamos el usuario decodificado a req.user
    next(); // Continuamos con la siguiente función de middleware o la ruta
  } catch (error) {
    return res.status(401).send('Token inválido o expirado');
  }
};

const adminMiddleware = (req, res, next) => {
  // Verificamos si el usuario tiene el rol de administrador
  if (req.user.role !== 'admin') {
    return res.status(403).send('Acceso denegado');
  }
  next(); // Continuamos si el usuario tiene el rol adecuado
};

module.exports = { authMiddleware, adminMiddleware };





