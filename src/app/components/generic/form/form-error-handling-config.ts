export interface FormErrorHandlingConfig {

  /**
   * By default, all errors returned by backend with status in this range are handled by taking the translation of the
   * error code and setting formErrorCode
   * */

  minStatus: number;
  maxStatus: number;

  /**
   * Even tho the status may be in the range, if the error is in this list it will be left for the handler
   * */

  ignoredErrorCodes: Array<string>;

  /**
   * If the error code is found in this list, the logic changes, a snackbar should appear top right with the
   * translation of the error code if the error code is present in ignored list then it will be ignored instead
   * this logic is applied regardless of status
   * */

  snackbarErrorCodes: Array<string>;
}
