import express from 'express';
import { celebrate, Joi } from 'celebrate';
import { getCurrentUser, updateUserInfo } from '../controllers/users';

const router = express.Router();

router.get('/me', getCurrentUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi
      .string()
      .min(2)
      .max(30),
    about: Joi
      .string()
      .min(2)
      .max(30),
  }),
}), updateUserInfo);

export default router;
