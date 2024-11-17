import { ErrorHandler, Injectable } from '@angular/core';
import { CheckError } from '../error/check-error';
import { BlueDreamShishaError } from '../error/blue-dream-shisha-error';
import { HandledError } from '../error/handled-error';

@Injectable({
  providedIn: 'root',
})
export class BlueDreamShishaErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    if (error instanceof BlueDreamShishaError) {
      console.error(error.errorResponse)
    } else if (!(error instanceof CheckError || error instanceof HandledError)) {
      console.error(error);
    }
  }
}
