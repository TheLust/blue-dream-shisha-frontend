export class HandledError extends Error {
  constructor() {
    super();
    this.name = "HandlerError";
  }
}
