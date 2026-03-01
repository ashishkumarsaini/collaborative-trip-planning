import { body, param } from "express-validator";

export const LOCATION_ADDRESS_NAME_MIN_LIMIT = 5;
export const LOCATION_ADDRESS_NAME_MAX_LIMIT = 300;

// location routes validators
const cityValidator = body('city')
  .notEmpty()
  .withMessage(`City cannot be empty!`);
const addressValidator = body('address')
  .isLength({ min: LOCATION_ADDRESS_NAME_MIN_LIMIT, max: LOCATION_ADDRESS_NAME_MAX_LIMIT })
  .withMessage(
    `Address should be in between ${LOCATION_ADDRESS_NAME_MIN_LIMIT} and ${LOCATION_ADDRESS_NAME_MAX_LIMIT} characters!`
  );
const stateValidator = body('state')
  .notEmpty()
  .withMessage(`City cannot be empty!`);
const countryValidator = body('country')
  .notEmpty()
  .withMessage(`Country cannot be empty!`);

export const locationValidators = [
  cityValidator,
  addressValidator,
  stateValidator,
  countryValidator
];

export const locationIdValidator = [
  param('locationId').notEmpty().withMessage("Location Id cannot be empty!")
];
