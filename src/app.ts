import express, {
  Express,
  Request,
  Response,
  NextFunction,
} from 'express';
import 'dotenv/config';
import appMiddleware from './middlewares/appMiddleware';
import logger from './utils/logger';
import Rollbar from './utils/errorNotifier';
import apiRoutes from './routes/api';
import { errorHandler } from './lib/errors';

const app: Express = express();

appMiddleware(app);

app.use('/', apiRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

// Handle 404 error
app.use((req, res) => {
  res.status(404)
    .send({ code: 404, message: 'The page you are looking for, could not be found on this server.' });
});

// All errors are sent back as JSON
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, { stack: err.stack });
  if (err) {
    next(errorHandler(err, req, res));
    return;
  }
  // Fallback to default node handler
  if (res.headersSent) {
    next(err);
    return;
  }
  if (process.env.NODE_ENV === 'production') {
    res.status(500)
      .send({ code: 500, message: 'Oops! Something went wrong, please try again later.' });
  } else {
    res.status(500)
      .send({ code: 500, message: 'Oops! Something went wrong, please try again later.', error: err });
  }
});

if (process.env.ENABLE_ERROR_REPORTING) app.use(Rollbar.errorHandler());

process.on('uncaughtException', (err) => {
  // Handle the error safely
  logger.error('uncaughtException', err);
  if (process.env.ENABLE_ERROR_REPORTING) Rollbar.error(err);
  process.exit(0);
});

export default app;
