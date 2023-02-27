import jwt from 'jsonwebtoken';
import UnauthorizedError from '../utils/errors/unauthorized-error';

export default function auth(req, res, next) {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'dev secret';
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
}
