class APIError extends Error {
  status: number = 500;

  constructor(status: number, ...args: any[]) {
    super(...args);

    this.status = status;

    Error.captureStackTrace(this, APIError);
  }
}

class AuthError extends Error {
  constructor(...args: any[]) {
    super(...args);

    Error.captureStackTrace(this, AuthError);
  }
}

export { APIError, AuthError };
