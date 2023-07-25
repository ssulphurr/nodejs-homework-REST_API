const messages = {
  200: "OK",
  201: "Created",
  204: "No Content",
  400: "Client Error",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
  422: "Unprocessable Entity",
  500: "Internal Server Error",
  default: "Something went wrong, please, try again later",
};

class HttpError extends Error {
  constructor(
    status = 500,
    message = messages[status] || this.messages.default
  ) {
    super(message);
    this.status = status;
  }
}

module.exports = HttpError;
