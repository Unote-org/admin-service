export const ALLOWED_ORIGINS: [string, string, string, string, RegExp] = [
  'http://localhost:5000',
  'http://localhost:3000',
  'http://127.0.0.1:5000',
  'http://127.0.0.1:3000',
  /\.unote\.in$/,
];

export const VALIDATION_MESSAGES = {
  required: 'is required',
  integer: 'should be a valid integer',
  boolean: 'should be a boolean',
  array: 'should be an array',
  date: 'should in YYYY-MM-DD format',
  isoTime: 'should be a valid ISO time string',
  email: 'should be a valid email',
  url: 'should be a valid URL',
  object: 'should be a valid object',
  string: 'should be a valid string',
  numeric: 'should be a valid numeric value',
  json: 'should be a valid JSON',
  invalidJson: 'Invalid JSON data',
};

export const VALID_STATUS = ['ACTIVE', 'INACTIVE', 'DELETED'];
