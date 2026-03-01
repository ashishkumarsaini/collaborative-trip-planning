import { extractJsonWebTokenPayload } from "../libs/jwt.js";
import { User } from "../models/user.model.js";
import { APIError, asyncHandler, RESPONSE_STATUS_CODE } from "../utils/index.js";

export const verifyJWT = asyncHandler(async (req, _res, next) => {
  const token = req.cookie?.accessToken || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    throw new APIError(RESPONSE_STATUS_CODE.unauthorized, "Unauthorized user");
  }

  try {
    const decodedToken = extractJsonWebTokenPayload(token);

    if (!decodedToken || !decodedToken._id) {
      throw new APIError(RESPONSE_STATUS_CODE.unauthorized, "Invalid token");
    }

    const user = await User.findById(decodedToken._id);

    if (!user) {
      throw new APIError("Invalid User");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new APIError(RESPONSE_STATUS_CODE.unauthorized, `Unauthorized Access. Error: ${error}`);
  }
});
