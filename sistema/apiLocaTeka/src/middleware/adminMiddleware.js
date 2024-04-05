const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET

const requireAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).send({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], jwtSecret);
    req.user = decoded;

    if(decoded && decoded.type === 'admin'){
      next();
    } else {
      res.status(401).send({ message: 'Seu usuario não tem permissão pra acessar essa pagina' });
    }
  } catch (error) {
    res.status(401).send({ message: 'Token inválido ou expirado' });
  }
};

module.exports = requireAdmin;