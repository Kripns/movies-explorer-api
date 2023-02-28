import express from 'express';
import { celebrate, Joi } from 'celebrate';
import { createUser, login } from '../controllers/users.js';
import auth from '../middlewares/auth.js';
import userRouter from './users.js';
import moviesRouter from './movies.js';
import NotFoundError from '../utils/errors/not-found-error.js';
import errorMessages from '../utils/errorMessages.js';

const router = express.Router();

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

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
  const err = new NotFoundError(errorMessages.noPage);
  next(err);
});

export default router;
