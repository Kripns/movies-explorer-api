import express from 'express';
import { celebrate, Joi } from 'celebrate';
import urlPattern from '../utils/urlPattern.js';
import { getMovies, createMovie, deleteMovie } from '../controllers/movies.js';

const router = express.Router();

router.get('/', getMovies);

router.post('/', celebrate({
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
    movieId: Joi.string().required().hex().length(24),
  }),
}), createMovie);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
}), deleteMovie);

export default router;
