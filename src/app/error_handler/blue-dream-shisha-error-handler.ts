import { ErrorHandler, Injectable } from '@angular/core';
import { CheckError } from '../error/check-error';
import { BlueDreamShishaError } from '../error/blue-dream-shisha-error';
import { HandledError } from '../error/handled-error';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';
import { ErrorDialogData } from '../components/error-dialog/error-dialog-data';
import { ErrorResponse } from '../api';

@Injectable({
  providedIn: 'root',
})
export class BlueDreamShishaErrorHandler implements ErrorHandler {

  constructor(private dialog: MatDialog) {}

  handleError(error: any): void {
    if (error instanceof CheckError) {
      //ignore
    } else if (error instanceof HandledError) {
      //ignore
    } else if (error instanceof BlueDreamShishaError) {
      console.error("Handled service error from backend", error.errorResponse)
      this.showErrorDialog(error.errorResponse);
    } else {
      console.error(error);
    }
  }

  private showErrorDialog(errorResponse: ErrorResponse): void {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        errorCode: errorResponse.error_code,
        status: errorResponse.status,
        showErrorCodeAsDescription: false
      } as ErrorDialogData
    })
  }
}
