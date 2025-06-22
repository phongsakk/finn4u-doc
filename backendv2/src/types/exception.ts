export class CustomError extends Error {
  constructor(public message: string, public code: number = 500) {
    super(message);
    this.code = code;
  }
}

export class UnauthorizeError extends CustomError {
  constructor() {
    super("Unauthorized", 401);
  }
}
