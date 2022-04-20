const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  // console.log(token, 'А теперь тут');
  let payload;

  try {
    console.log(JWT_SECRET);
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    // payload = jwt.verify(token, 'some-secret-key');
    // console.log(payload);
  } catch (err) {
    next(new UnauthorizedError('С токеном что-то не так'));
  }

  console.log(NODE_ENV, JWT_SECRET);
  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
