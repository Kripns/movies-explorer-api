import { celebrate, Joi } from 'celebrate';
import urlPattern from '../utils/urlPattern.js';

export const validateRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
});

export const validateMovieInfo = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    country: Joi.string().required(),
    duration: Joi.number().required(),
    director: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri().pattern(urlPattern),
    trailerLink: Joi.string().required().uri().pattern(urlPattern),
    thumbnail: Joi.string().required().uri().pattern(urlPattern),
    movieId: Joi.number().required(),
  }),
});

export const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
});
