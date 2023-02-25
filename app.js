/* eslint-disable import/first */
import * as dotenv from 'dotenv';

dotenv.config();

import express from 'express';

const app = express();
const { PORT = 3000 } = process.env;

app.listen(PORT);
