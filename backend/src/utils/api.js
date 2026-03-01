export class APIError {
  constructor(statusCode, message, error, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
    this.data = data;
  }
}

export class APIResponse {
  constructor(statusCode, message, error, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
