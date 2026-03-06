import { asyncHandler, APIError, RESPONSE_STATUS_CODE } from '../utils/index.js';
import { USER_ROLE } from "../validators/user.validators.js";

export const verifyAdmin = asyncHandler(async (req, _res, next) => {
  const user = req.user; // verifyJWT should be execute before
  if (!user) {
    throw new APIError(RESPONSE_STATUS_CODE.forbidden, 'Unauthorized Access! Invalid User');
  }

  const isAdminUser = user.role === USER_ROLE.admin;

  if (!isAdminUser) {
    throw new APIError(RESPONSE_STATUS_CODE.forbidden, 'Unauthorized Access! Not an admin');
  }

  req.user = user;
  next();
});

export const verifySubAdmin = asyncHandler(async (req, _res, next) => {
  const user = req.user; // verifyJWT should be execute before
  if (!user) {
    throw new APIError(RESPONSE_STATUS_CODE.forbidden, 'Unauthorized Access! Invalid User');
  }

  const isAdminUser = user.role === USER_ROLE.subAdmin;

  if (!isAdminUser) {
    throw new APIError(RESPONSE_STATUS_CODE.forbidden, 'Unauthorized Access! Not a subadmin');
  }

  req.user = user;
  next();
});

export const verifyAdminOrSubAdmin = asyncHandler(async (req, _res, next) => {
  const user = req.user; // verifyJWT should be execute before
  if (!user) {
    throw new APIError(RESPONSE_STATUS_CODE.forbidden, 'Unauthorized Access! Invalid User');
  }

  const isAdminUser = user.role === USER_ROLE.subAdmin || user.role === USER_ROLE.admin;

  if (!isAdminUser) {
    throw new APIError(RESPONSE_STATUS_CODE.forbidden, 'Unauthorized Access!');
  }

  req.user = user;
  next();
});
