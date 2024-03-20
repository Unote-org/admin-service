import ServerlessHttp from 'serverless-http';
import app from './app';

// eslint-disable-next-line import/prefer-default-export
export const handler = ServerlessHttp(app, {
  provider: 'aws',
  basePath: '/v2/assessments',
});
