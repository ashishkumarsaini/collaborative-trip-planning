import mongoose from 'mongoose';
import {
  FIRST_NAME_MAX_LIMIT,
  FIRST_NAME_MIN_LIMIT,
  LAST_NAME_MAX_LIMIT,
  LAST_NAME_MIN_LIMIT,
  USER_ROLE,
  AVAILABLE_USER_ROLES
} from '../validators';
import {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET_EXPIRY,
  generateJsonWebToken,
  getBcryptHashed,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET_EXPIRY
} from '../libs';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: FIRST_NAME_MIN_LIMIT,
    maxlength: FIRST_NAME_MAX_LIMIT
  },
  lastName: {
    type: String,
    trim: true,
    minlength: LAST_NAME_MIN_LIMIT,
    maxlength: LAST_NAME_MAX_LIMIT
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: AVAILABLE_USER_ROLES,
    default: USER_ROLE.USER
  },
  refreshToken: {
    type: String
  }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await getBcryptHashed(this.password);
});

userSchema.methods.generateAccessToken = function () {
  const payload = {
    _id: this._id,
    email: this.email,
    firstName: this.firstName
  };

  return generateJsonWebToken(
    payload,
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_SECRET_EXPIRY
  );
};

userSchema.methods.generateRefreshToken = function () {
  const payload = {
    _id: this._id,
    email: this.email,
    firstName: this.firstName
  };

  return generateJsonWebToken(
    payload,
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET_EXPIRY
  );
};

export const user = mongoose.model('User', userSchema);
