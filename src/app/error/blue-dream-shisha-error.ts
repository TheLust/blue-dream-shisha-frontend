import { ErrorResponse } from '../api';

export class BlueDreamShishaError extends Error {

  useDefaultErrorDialog: boolean = true;

  constructor(public errorResponse: ErrorResponse) {
    super();
    this.name = "BlueDreamShishaError";
  }
}
