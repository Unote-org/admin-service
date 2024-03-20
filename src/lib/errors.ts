/* eslint-disable max-classes-per-file */
import logger from '../utils/logger';

type Resp = {
  code: number;
  message: string;
  errorType?: string;
  error?: string;
};

export class ApiError extends Error {
  statusCode: string;

  code: number;

  constructor(statusCode, code, message) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.message = message;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ResourceNotFound extends ApiError {
  constructor(resource = null) {
    const statusCode = 404;
    const code = 1001;
    let message = 'The requested resource was not found';
    if (resource) message = `The requested resource(${resource}) was not found`;
    super(statusCode, code, message);
  }
}

export const errorHandler = (error, req, res) => {
  logger.error(error);
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      type: 'failure',
      code: error.code,
      message: error.message,
      error: error.message,
    });
  }
  const resp: Resp = {
    code: 500,
    message: 'Oops! Something went wrong, please try again later',
  };

  if (error.name === 'QueryResultError' && error.code === 0) {
    const customError = new ResourceNotFound();

    return res.status(customError.statusCode).json({
      type: 'failure',
      code: customError.code,
      message: customError.message,
      error: customError.message,
    });
  }

  if (process.env.env !== 'prod') {
    resp.errorType = error.name;
    resp.error = error.message;
  }
  return res.status(500).json(resp);
};
