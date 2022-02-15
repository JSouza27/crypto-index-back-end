class HttpStatus {
  constructor() {
    this.ok = 200;
    this.badRequest = 400;
    this.unauthorized = 401;
    this.notFound = 404;
  }

  get Ok() {
    return this.ok;
  }

  get BadRequest() {
    return this.badRequest;
  }

  get Unauthorized() {
    return this.unauthorized;
  }

  get NotFound() {
    return this.notFound;
  }
}

module.exports = HttpStatus;
