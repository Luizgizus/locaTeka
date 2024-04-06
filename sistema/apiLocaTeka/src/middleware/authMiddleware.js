const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if(req.path.includes("/auth")){
    next();
    return;
  }

  if (!token) {
    return res.status(403).send({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error)
    res.status(401).send({ message: 'Token inválido ou expirado' });
  }
};

module.exports = requireAuth;