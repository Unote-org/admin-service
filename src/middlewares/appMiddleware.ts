/* eslint-disable @typescript-eslint/no-unused-vars */
import helmet from 'helmet';
import {
  Express,
  json,
  urlencoded,
} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import _ from 'lodash';
import compression from 'compression';
import { ALLOWED_ORIGINS } from '../lib/constants';

const corsOptions = {
  origin: ALLOWED_ORIGINS,
  credentials: true,
};

export default (app: Express) => {
  app.use(urlencoded({
    extended: true,
  }));
  app.use(json());
  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(compression());
};
