export abstract class BaseError extends Error {
  public abstract getCode(): string;
}
