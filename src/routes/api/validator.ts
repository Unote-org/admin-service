/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  body, query,
} from 'express-validator';
import { VALIDATION_MESSAGES } from '../../lib/constants';

export const getDemo: any = [
  body('queryData')
    .notEmpty()
    .withMessage(VALIDATION_MESSAGES.required)
    .bail()
    .isInt()
    .withMessage(VALIDATION_MESSAGES.integer)
    .toInt(),
];

export const postDemo: any = [
  query('data')
    .notEmpty()
    .withMessage(VALIDATION_MESSAGES.required)
    .bail()
    .isInt()
    .withMessage(VALIDATION_MESSAGES.integer)
    .toInt(),
];
