import {
  Router,
} from 'express';
import * as validators from './validator';
import * as controller from './controller';
import validateRequest from '../../lib/requestValidator';
// import { ensureAuthorized } from '../../lib/auth';

const router = Router();

router.get('/demo', [
  validators.postDemo,
  validateRequest,
//   ensureAuthorized,
], controller.getDemo);

export default router;
