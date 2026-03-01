import { validationResult } from 'express-validator';
import { APIError, asyncHandler, RESPONSE_STATUS_CODE } from "../utils/index.js";

export const validateMiddleware = asyncHandler(async (req, _res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors
    .array()
    .map((error) => ({ [error.path]: error.msg }));

  throw new APIError(RESPONSE_STATUS_CODE.badRequest, 'Invalid data', extractedErrors);
});
