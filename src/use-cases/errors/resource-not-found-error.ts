export class ResourceNotFoundError extends Error {
  constructor() {
    super("Resource Not Found ");
    this.name = "InvalidCredentialsError";
  }
}
