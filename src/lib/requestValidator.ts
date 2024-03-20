import { validationResult } from 'express-validator';
import logger from '../utils/logger';

// Middleware to validate request
export default (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Validation error occurred', {
      requestPayload: {
        params: req.params,
        query: req.query,
        body: req.body,
        headers: req.headers,
        originalUrl: req.originalUrl,
      },
    });
    return res.status(400).json({ success: false, errors: errors.array(), message: 'Invalid request' });
  }
  return next();
};
