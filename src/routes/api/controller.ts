import asyncHandler from 'express-async-handler';

export const getDemo = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'working correctly' });
});

export const postDemo = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'working correctly twice' });
});
