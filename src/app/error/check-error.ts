/**
 * Exception for check api, when FieldError[] length != 0 throw CheckError for interrupting workflow.
 * Error handler ignores this Error
 * */

export class CheckError extends Error {
  constructor() {
    super();
    this.name = "CheckError";
  }
}
