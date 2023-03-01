import express from 'express';
import { getMovies, createMovie, deleteMovie } from '../controllers/movies.js';
import { validateMovieInfo, validateDeleteMovie } from '../middlewares/reqValidation.js';

const router = express.Router();

router.get('/', getMovies);

router.post('/', validateMovieInfo, createMovie);

router.delete('/:id', validateDeleteMovie, deleteMovie);

export default router;
