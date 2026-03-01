import jwt from 'jsonwebtoken';

export const generateJsonWebToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn: expiresIn });
};

export const extractJsonWebTokenPayload = (token, secret) => {
  return jwt.decode(token, secret);
};
