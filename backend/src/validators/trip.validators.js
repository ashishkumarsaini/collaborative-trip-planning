import { body } from "express-validator";

export const TRIP_NAME_MIN_LENGTH = 5;
export const TRIP_NAME_MAX_LENGTH = 100;

// trip route validators
const nameValidators = body('name')
  .trim()
  .isLength({ min: TRIP_NAME_MIN_LENGTH, max: TRIP_NAME_MAX_LENGTH })
  .withMessage(`Name should be between ${TRIP_NAME_MIN_LENGTH} and ${TRIP_NAME_MAX_LENGTH} characters!`);

const startDateValidator = body('startDate')
  .isDate()
  .withMessage("Start date should be valid!")
  .custom((value) => {
    if (value <= new Date()) { // should be a future date
      throw new Error('Start date must be in the future!');
    }

    return true;
  });

export const tripValidator = [
  nameValidators,
  startDateValidator
];
