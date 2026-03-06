import { body } from "express-validator";
import { LOCATION_DESC_NAME_MAX_LIMIT, LOCATION_DESC_NAME_MIN_LIMIT } from "./location.validators.js";

export const ACTIVITY_NAME_MIN_LENGTH = 3;
export const ACTIVITY_NAME_MAX_LENGTH = 100;

export const ACTIVITY_DESCRIPTION_MIN_LENGTH = 3;
export const ACTIVITY_DESCRIPTION_MAX_LENGTH = 1000;

// activity route validators

const activityNameValidator = body('name')
  .trim()
  .isLength({ min: ACTIVITY_NAME_MIN_LENGTH, max: ACTIVITY_NAME_MAX_LENGTH })
  .withMessage(
    `Activity name should be in between ${ACTIVITY_NAME_MIN_LENGTH} and ${ACTIVITY_NAME_MAX_LENGTH} characters!`
  );

const activityDescValidator = body('name')
  .trim()
  .isLength({ min: ACTIVITY_DESCRIPTION_MIN_LENGTH, max: ACTIVITY_DESCRIPTION_MAX_LENGTH })
  .withMessage(
    'Activity name should be in between '
    + ACTIVITY_DESCRIPTION_MIN_LENGTH
    + ' and '
    + ACTIVITY_DESCRIPTION_MAX_LENGTH
    + ' characters!'
  );

const numberOfDaysValidator = body('numberOfDays')
  .custom((value) => {
    if (typeof value !== 'number') {
      throw new Error('Invalid number of days!');
    }
    if (value <= 0) { // should be a future date
      throw new Error('Number of days cannot be 0 or negative!');
    }

    return true;
  });

const startDateValidator = body('startDate')
  .isDate()
  .withMessage("Start date should be valid!")
  .custom((value) => {
    if (value <= new Date()) { // should be a future date
      throw new Error('Start date must be in the future!');
    }

    return true;
  });

const orderValidator = body('order')
  .custom((value) => {
    if (typeof value !== 'number') {
      throw new Error("Invalid order!");
    }
    if (value <= 0) { // should be a future date
      throw new Error('Activity order cannot be 0 or negative!');
    }

    return true;
  });
const locationValidator = body('location').isObject().withMessage(`Loction is required!`);

const activityLocationCity = body('location.city').notEmpty()
  .withMessage(`City cannot be empty!`);
const activityLocationDesc = body('location.description')
  .isLength({ min: LOCATION_DESC_NAME_MIN_LIMIT, max: LOCATION_DESC_NAME_MAX_LIMIT })
  .withMessage(
    `Description should be in between ${LOCATION_DESC_NAME_MIN_LIMIT} and ${LOCATION_DESC_NAME_MAX_LIMIT} characters!`
  );

export const activityValidator = [
  activityNameValidator,
  activityDescValidator,
  numberOfDaysValidator,
  startDateValidator,
  orderValidator,
  locationValidator,
  activityLocationCity,
  activityLocationDesc
];
