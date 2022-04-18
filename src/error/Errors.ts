import { BaseError } from './BaseError';

export class ParameterError extends BaseError {
  public getCode(): string {
    return ERROR.PARAMETER_ERROR;
  }
}

export class PasswordError extends BaseError {
  public getCode(): string {
    return ERROR.PASSWORD_INCORRECT;
  }
}
