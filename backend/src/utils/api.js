export const RESPONSE_STATUS_CODE = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  internalServer: 500
};

export class APIError {
  constructor(statusCode, message, errors, stack, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.stack = stack;
    this.data = data;
    this.success = false;
  }
}

export class APIResponse {
  constructor(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode >= 200 && statusCode <= 299;
  }
}
