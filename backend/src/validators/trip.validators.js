import { body } from "express-validator";

export const TRIP_NAME_MIN_LENGTH = 5;
export const TRIP_NAME_MAX_LENGTH = 100;

// trip route validators
const nameValidators = body('name')
  .trim()
  .isLength({ min: TRIP_NAME_MIN_LENGTH, max: TRIP_NAME_MAX_LENGTH })
  .withMessage(`Name should be between ${TRIP_NAME_MIN_LENGTH} and ${TRIP_NAME_MAX_LENGTH} characters!`);

export const tripValidator = [
  nameValidators
];
