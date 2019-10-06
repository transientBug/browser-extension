class APIError extends Error {
  status: number = 500;

  constructor(status: number, ...args: any[]) {
    super(...args);

    this.status = status;
  }
}

class AuthError extends Error {}

export { APIError, AuthError };
