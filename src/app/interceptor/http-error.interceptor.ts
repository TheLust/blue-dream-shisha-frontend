import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { BlueDreamShishaError } from '../error/blue-dream-shisha-error';
import { ErrorResponse } from '../api';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(err => {
      let errorResponse: ErrorResponse = {};

      if (err.status === 0) {
        errorResponse = {
          error_code: 'ERROR_SERVICE_UNAVAILABLE',
          error_description: "The backend is unavailable at the moment",
          status: 0
        } as ErrorResponse;
      } else {
        errorResponse = err.error as ErrorResponse;
      }

      const blueDreamShishaError: BlueDreamShishaError = new BlueDreamShishaError(
        errorResponse
      );
      return throwError(() => blueDreamShishaError);
    })
  );
};
