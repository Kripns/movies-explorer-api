/* eslint-disable import/first */
import * as dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import helmet from 'helmet';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import routes from './routes/index.js';
import centralizedErrorHandler from './middlewares/centralizedErrorHandler.js';
import corsHandler from './middlewares/cors.js';
import limiter from './middlewares/rateLimiter.js';
import apiConfig from './utils/apiConfig.js';

const { NODE_ENV, PORT = 3000, DB_URL } = process.env;
const app = express();

mongoose.connect(NODE_ENV === 'production' ? DB_URL : apiConfig.devDbUrl);

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(corsHandler);

app.use(limiter);

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(centralizedErrorHandler);

app.listen(PORT);
