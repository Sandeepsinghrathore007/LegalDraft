export class ApiError extends Error {
  code: string;
  status: number;

  constructor(
    message: string,
    options: {
      code?: string;
      status?: number;
    } = {}
  ) {
    super(message);

    this.code = options.code ?? "API_ERROR";
    this.name = "ApiError";
    this.status = options.status ?? 500;
  }
}

export class NetworkUnavailableError extends ApiError {
  constructor(message = "Your connection looks offline. Reconnect and try again.") {
    super(message, {
      code: "NETWORK_UNAVAILABLE",
      status: 503
    });

    this.name = "NetworkUnavailableError";
  }
}
