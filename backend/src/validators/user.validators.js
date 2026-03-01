import { body } from "express-validator";

export const FIRST_NAME_MAX_LIMIT = 25;
export const FIRST_NAME_MIN_LIMIT = 2;
export const LAST_NAME_MAX_LIMIT = 25;

export const USER_ROLE = Object.freeze({
  user: 'user',
  subAdmin: 'subAdmin',
  admin: 'admin'
});

export const AVAILABLE_USER_ROLES = Object.values(USER_ROLE);

// user route validators
const firstNameValidator = body('firstName')
  .trim()
  .isLength({ min: FIRST_NAME_MIN_LIMIT, max: FIRST_NAME_MAX_LIMIT })
  .withMessage(
    `First name should be between ${FIRST_NAME_MIN_LIMIT} and ${FIRST_NAME_MAX_LIMIT} characters!`
  );
const lastNameValidator = body('lastName')
  .trim()
  .isLength({ max: LAST_NAME_MAX_LIMIT })
  .withMessage(`Last name should be max ${FIRST_NAME_MAX_LIMIT} characters!`);;
const emailValidator = body('email')
  .trim()
  .notEmpty()
  .withMessage('Email cannot be empty!')
  .isEmail()
  .withMessage('Email should be valid!');
const passwordValidator = body('password').notEmpty().withMessage('Password cannot be empty!');

export const registerUserValidator = [
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  passwordValidator
];

export const loginUserValidator = [
  emailValidator,
  passwordValidator
];
