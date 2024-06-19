// app.js

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import httpStatus from 'http-status';
import config from './config/config.js';
import * as morgan from './config/morgan.js';
import { errorConverter, errorHandler } from './middlewares/error.js';
import routes from './routers/index.js';
import { ApiError } from './utils/ApiError.js';

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// Set security HTTP headers
app.use(helmet());

// Parse JSON request body
app.use(express.json());

// Parse URL-encoded request body
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());
app.options('*', cors());

// Health check route
app.get('/health', (req, res) => res.status(200).json({ message: 'Server is healthy!' }));

// v1 API routes
app.use('/', routes);

// Send back a 404 error for any unknown API request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// Convert error to ApiError, if needed
app.use(errorConverter);

// Handle error
app.use(errorHandler);

export { app };
