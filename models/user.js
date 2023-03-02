import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
import bcrypt from 'bcrypt';
import UnauthorizedError from '../utils/errors/unauthorized-error.js';
import errorMessages from '../utils/errorMessages.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => isEmail(v),
        message: errorMessages.badEmail,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    statics: {
      findUserByCredentials(email, password) {
        return this.findOne({ email }).select('+password')
          .then((user) => {
            if (!user) {
              return Promise.reject(new UnauthorizedError(errorMessages.badEmailOrUrl));
            }
            return bcrypt.compare(password, user.password)
              .then((matched) => {
                if (!matched) {
                  return Promise.reject(new UnauthorizedError(errorMessages.badEmailOrUrl));
                }
                return user;
              });
          });
      },
    },
  },
);

export default mongoose.model('user', userSchema);
