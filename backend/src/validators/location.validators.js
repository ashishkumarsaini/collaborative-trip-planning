import { body, param } from "express-validator";

export const LOCATION_ADDRESS_NAME_MIN_LIMIT = 5;
export const LOCATION_ADDRESS_NAME_MAX_LIMIT = 300;

export const LOCATION_DESC_NAME_MIN_LIMIT = 5;
export const LOCATION_DESC_NAME_MAX_LIMIT = 300;

// location routes validators
const cityValidator = body('city')
  .notEmpty()
  .withMessage(`City cannot be empty!`);
const descriptionValidator = body('description')
  .isLength({ min: LOCATION_DESC_NAME_MIN_LIMIT, max: LOCATION_DESC_NAME_MAX_LIMIT })
  .withMessage(
    `Description should be in between ${LOCATION_DESC_NAME_MIN_LIMIT} and ${LOCATION_DESC_NAME_MAX_LIMIT} characters!`
  );
// TODO: imporve location model
// const stateValidator = body('state')
//   .notEmpty()
//   .withMessage(`City cannot be empty!`);
// const countryValidator = body('country')
//   .notEmpty()
//   .withMessage(`Country cannot be empty!`);

export const locationValidators = [
  cityValidator,
  descriptionValidator
  // stateValidator,
  // countryValidator
];

export const locationIdValidator = [
  param('locationId').notEmpty().withMessage("Location Id cannot be empty!")
];
