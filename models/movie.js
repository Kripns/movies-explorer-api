import mongoose from 'mongoose';
import isURL from 'validator/lib/isURL.js';
import errorMessages from '../utils/errorMessages.js';

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validator: {
      validate: (v) => isURL(v),
      message: errorMessages.badUrl,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validator: {
      validate: (v) => isURL(v),
      message: errorMessages.badUrl,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validator: {
      validate: (v) => isURL(v),
      message: errorMessages.badUrl,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

export default mongoose.model('movie', movieSchema);
