class HttpStatus {
  constructor() {
    this.ok = 200;
    this.BadRequest = 400;
  }

  Ok() {
    return this.ok;
  }

  BadRequest() {
    return this.BadRequest;
  }
}

module.exports = HttpStatus;
