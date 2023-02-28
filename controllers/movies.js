import Movie from '../models/movie';
import BadRequestError from '../utils/errors/bad-request-error';
import NotFoundError from '../utils/errors/not-found-error';
import ForbiddenError from '../utils/errors/forbiden-error';

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

  return Movie.create(
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
  )
    .then((newMovie) => res.send(newMovie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
}

export function deleteMovie(req, res, next) {
  return Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) throw new NotFoundError('Запрашиваемый фильм не найден');
      if (movie.owner.valueOf() !== req.user._id) {
        throw new ForbiddenError('Недостаточно прав для удаления карточки');
      }
      Movie.findByIdAndRemove(movie._id)
        .then((removedMovie) => res.send(removedMovie))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Получен некорректный _id карточки'));
      } else {
        next(err);
      }
    });
}
