export const FIRST_NAME_MAX_LIMIT = 25;
export const FIRST_NAME_MIN_LIMIT = 2;
export const LAST_NAME_MAX_LIMIT = 25;
export const LAST_NAME_MIN_LIMIT = 2;

export const USER_ROLE = Object.freeze({
  user: 'user',
  subAdmin: 'subAdmin',
  admin: 'admin'
});

export const AVAILABLE_USER_ROLES = Object.values(USER_ROLE);
