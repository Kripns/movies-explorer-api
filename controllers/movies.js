import Movie from '../models/movie.js';
import BadRequestError from '../utils/errors/bad-request-error.js';
import NotFoundError from '../utils/errors/not-found-error.js';
import ForbiddenError from '../utils/errors/forbiden-error.js';
import errorMessages from '../utils/errorMessages.js';

export function getMovies(req, res, next) {
  return Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
}

export function createMovie(req, res, next) {
  const owner = req.user._id;
  const {
    nameRU,
    nameEN,
    country,
    duration,
    director,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
  } = req.body;

  return Movie.create({
    nameRU,
    nameEN,
    country,
    duration,
    director,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
  })
    .then((newMovie) => res.send(newMovie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(errorMessages.badData));
      } else {
        next(err);
      }
    });
}

export function deleteMovie(req, res, next) {
  return Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) throw new NotFoundError(errorMessages.noMovie);
      if (movie.owner.valueOf() !== req.user._id) {
        throw new ForbiddenError(errorMessages.forbiddenErr);
      }
      Movie.findByIdAndRemove(movie._id)
        .then((removedMovie) => res.send(removedMovie))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(errorMessages.badMovieId));
      } else {
        next(err);
      }
    });
}
