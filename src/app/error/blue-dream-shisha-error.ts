import { ErrorResponse } from '../api';

export class BlueDreamShishaError extends Error {

  constructor(public errorResponse: ErrorResponse) {
    super();
    this.name = "BlueDreamShishaError";
  }
}
