import express from 'express';
import { validateRegister, validateLogin } from '../middlewares/reqValidation.js';
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

router.post('/signup', validateRegister, createUser);

router.post('/signin', validateLogin, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', moviesRouter);

router.use((req, res, next) => {
  const err = new NotFoundError(errorMessages.noPage);
  next(err);
});

export default router;
