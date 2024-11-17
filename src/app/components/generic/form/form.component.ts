import { ErrorResponse, FieldError } from '../../../api';
import { lastValueFrom, Observable } from 'rxjs';
import { CheckError } from '../../../error/check-error';
import { LoadingComponent } from '../loading/loading.component';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { BlueDreamShishaError } from '../../../error/blue-dream-shisha-error';
import { HandledError } from '../../../error/handled-error';
import { Component } from '@angular/core';

@Component({
  template: ''
})
export abstract class FormComponent<Request, Response> extends LoadingComponent {

  readonly formGroup: FormGroup;
  public validate: boolean = true;
  public formErrorCode: string | null = null;

  protected constructor(formGroup: FormGroup) {
    super();
    this.formGroup = formGroup;
  }

  submit(request?: Request): Promise<Response> {
    if (!this.formErrorCode) {
      this.formErrorCode = null;
    }
    const actualRequest: Request = request
      ? request
      : this.getRequest();
    const checkObservable: Observable<Array<FieldError>> | null = this.check(actualRequest);
    if (checkObservable) {
      return lastValueFrom(this.fetchData(checkObservable))
        .then((fieldErrors: FieldError[]) => {
          if (fieldErrors.length != 0) {
            this.handleFieldErrors(fieldErrors);
            throw new CheckError();
          } else {
            return this.send(actualRequest);
          }
        })
        .catch(error => {
          if (error instanceof BlueDreamShishaError) {
            this.handleError(error);
          }
          throw error;
        });
    } else {
      return this.send(actualRequest);
    }
  }

  public getError(controlName: string): string | null {
    const control: AbstractControl | null = this.formGroup.get(controlName);
    if (control) {
      return control.errors
        ? this.mapErrorCode(controlName, control.errors)
        : null;
    }

    return null;
  }

  /**
   * Reference to the desired endpoint(the one that will consume the form) and return the desired result
   * */

  abstract action(request: Request): Observable<Response>;

  /**
   * Reference to the desired check api, if null the check step will be skipped
   * */

  abstract check(request: Request): Observable<Array<FieldError>> | null;


  /**
   * Map containing replacements for default error codes by controlName
   * If null the error message will be the errorCode (exempt the case where translations are defined for them)
   * */

  abstract fieldErrorCodeMappings(): Map<string, Map<string, string>> | null;

  private send(request: Request): Promise<Response> {
    return lastValueFrom(this.fetchData(this.action(request)))
      .catch((error: BlueDreamShishaError) => {
        this.handleError(error);
        throw error;
      });
  }

  private getRequest(): Request {
    if (this.validate) {
      if (this.formGroup.valid) {
        return this.formGroup.value;
      } else {
        throw new CheckError();
      }
    } else {
      return this.getRequest();
    }
  }

  private handleFieldErrors(fieldErrors: Array<FieldError>): void {
    fieldErrors.forEach((fieldError: FieldError) => {
      if (fieldError && fieldError.json_path && fieldError.error_code) {
        const control: AbstractControl | null = this.formGroup.get(fieldError.json_path);
        if (!control) {
          throw new Error(`Received json_path = [${fieldError.json_path}] from check api but not found in formGroup.controls`);
        }

        control.setErrors({[fieldError.error_code]: true}, {emitEvent: true});
      }
    });
  }

  /**
   * Converts default Angular Validators error codes with custom ones defined in abstract (implementation)
   * method fieldErrorCodeMappings
   * */

  private mapErrorCode(controlName: string, defaultFieldError: ValidationErrors | string): string {
    const defaultFieldErrorCode: string = Object.keys(defaultFieldError)[0];
    const fieldErrorCodeMappings: Map<string, Map<string, string>> | null = this.fieldErrorCodeMappings();
    if (fieldErrorCodeMappings) {
      const customFieldErrorCodeByDefaultFieldErrorCode: Map<string, string> | undefined = fieldErrorCodeMappings.get(
        controlName
      );
      if (customFieldErrorCodeByDefaultFieldErrorCode) {
        const customFieldErrorCode: string | undefined = customFieldErrorCodeByDefaultFieldErrorCode.get(
          defaultFieldErrorCode
        );
        if (customFieldErrorCode) {
          return customFieldErrorCode;
        }
      }
    }

    return defaultFieldErrorCode;
  }

  private handleError(error: BlueDreamShishaError): void {
    const errorResponse: ErrorResponse = error.errorResponse;
    if (errorResponse.status && errorResponse.status >= 400 && errorResponse.status <= 499) {
      this.formErrorCode = errorResponse.error_code ? errorResponse.error_code : null;
      throw new HandledError();
    }
  }
}