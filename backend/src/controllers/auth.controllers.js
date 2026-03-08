import { User } from "../models/user.model.js";
import { APIError, APIResponse, asyncHandler, RESPONSE_STATUS_CODE } from "../utils/index.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const searchedUser = await User.exists({ email });

  if (searchedUser) {
    throw new APIError(RESPONSE_STATUS_CODE.conflict, "Email already exists!");
  }
  const newUser = await User.create({ firstName, lastName, email, password });
  if (!newUser) {
    throw new APIError(RESPONSE_STATUS_CODE.internalServer, 'Failed to register user');
  }
  res
    .status(RESPONSE_STATUS_CODE.created)
    .json(
      new APIResponse(
        RESPONSE_STATUS_CODE.created,
        'User registered successfully',
        { user: newUser }
      )
    );
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new APIError(RESPONSE_STATUS_CODE.unauthorized, 'User not found!');
  }

  const isPasswordMatched = await user.isValidPassword(password);

  if (!isPasswordMatched) {
    throw new APIError(RESPONSE_STATUS_CODE.unauthorized, 'Invalid Password!');
  };

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  const cookieOptions = {
    httpOnly: true,
    secure: true
  };

  res
    .status(RESPONSE_STATUS_CODE.ok)
    .cookie('accessToken', accessToken, cookieOptions) // attach token to the request
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json(
      new APIResponse(
        RESPONSE_STATUS_CODE.ok,
        "Logged in successfully!",
        {
          user: user.toJSON(),
          accessToken
        }
      )
    );
});

export const getUserProfile = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new APIError(RESPONSE_STATUS_CODE.notFound, 'User not found!');
  }

  res
    .status(RESPONSE_STATUS_CODE.ok)
    .json(
      new APIResponse(
        RESPONSE_STATUS_CODE.ok,
        'User fetched successfully',
        { user: req.user.toJSON() }
      )
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new APIError(RESPONSE_STATUS_CODE.notFound, 'User not found!');
  }

  const userId = req.user._id;

  await User.findOneAndUpdate(userId, { $set: { refreshToken: '' } }); // empty refreshToken from db

  return res
    .status(RESPONSE_STATUS_CODE.ok)
    .clearCookie('accessToken')
    .clearCookie('refreshToken')
    .json(new APIResponse(RESPONSE_STATUS_CODE.ok, 'User logged out!'));
});
