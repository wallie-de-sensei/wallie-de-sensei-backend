/**
 * Base application error class that extends native Error
 * All custom errors should extend this class to maintain consistency
 * 
 * @property {number} statusCode - HTTP status code for the error
 * @property {boolean} isOperational - Indicates if error is operational (expected) vs programming error
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error thrown when a requested resource is not found
 * Automatically sets status code to 404
 * 
 * @example throw new NotFoundError('User')
 */
export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404);
  }
}

/**
 * Error thrown for validation failures (invalid input data)
 * Automatically sets status code to 400
 * 
 * @example throw new ValidationError('Email format is invalid')
 */
export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

/**
 * Error thrown when authentication is required but not provided
 * Automatically sets status code to 401
 * 
 * @example throw new UnauthorizedError('Invalid credentials')
 */
export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

/**
 * Error thrown when user lacks permissions for requested action
 * Automatically sets status code to 403
 * 
 * @example throw new ForbiddenError('Admin access required')
 */
export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

/**
 * Error thrown when operation conflicts with current state
 * Automatically sets status code to 409
 * 
 * @example throw new ConflictError('Email already registered')
 */
export class ConflictError extends AppError {
  constructor(message = 'Conflict') {
    super(message, 409);
  }
}
