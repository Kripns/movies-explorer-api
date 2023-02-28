import errorMessages from '../utils/errorMessages.js';

export default function centralizedErrorHandler(err, req, res, next) {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? errorMessages.defaultErr
        : message,
    });
  next();
}
