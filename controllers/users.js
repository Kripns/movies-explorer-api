import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import NotFoundError from '../utils/errors/not-found-error';
import BadRequestError from '../utils/errors/bad-request-error';
import ConflictError from '../utils/errors/conflict-error';
import User from '../models/user';

export function createUser(req, res, next) {
  const { name, email, password } = req.body;
  return bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash })
      .then((user) => {
        res.send({
          name: user.name,
          email: user.email,
          _id: user._id,
        });
      }))
    .catch((err) => {
      if (err.code && err.code === 11000) {
        next(new ConflictError('Пользователь с такой почтой уже зарегистрирован'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
}

export function login(req, res, next) {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      return res.send({
        name: user.name,
        email: user.email,
        _id: user._id,
        token,
      });
    })
    .catch(next);
}

export function getCurrentUser(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) throw new NotFoundError('Запрашиваемый пользователь не найден');
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный _id пользователя'));
      } else {
        next(err);
      }
    });
}

export function updateUserInfo(req, res, next) {
  const { name, email } = req.body;
  User.findById(req.user._id)
    .then((user) => {
      if (!user) throw new NotFoundError('Запрашиваемый пользователь не найден');
      User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
        .then((updatedUser) => res.send(updatedUser))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный _id пользователя'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
}
