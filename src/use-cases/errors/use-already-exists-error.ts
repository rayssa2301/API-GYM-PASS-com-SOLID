export class UseAlreadyExistsError extends Error {
  constructor() {
    super("Use already exist");
  }
}
