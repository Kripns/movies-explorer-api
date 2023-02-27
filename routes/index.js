import express from 'express';
import { celebrate, Joi } from 'celebrate';
import { createUser, login } from '../controllers/users';
import auth from '../middlewares/auth';
import userRouter from './users';
import moviesRouter from './movies';
import NotFoundError from '../utils/errors/not-found-error';

const router = express.Router();

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', moviesRouter);

router.use((req, res, next) => {
  const err = new NotFoundError('Ошибка 404: Страница не найдена');
  next(err);
});

export default router;
