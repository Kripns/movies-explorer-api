/* eslint-disable import/first */
import * as dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import { requestLogger, errorLogger } from './middlewares/logger';
import routes from './routes/index';
import centralizedErrorHandler from './middlewares/centralizedErrorHandler';

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;
const app = express();

mongoose.connect(DB_URL);

app.use(bodyParser);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(centralizedErrorHandler);

app.listen(PORT);
