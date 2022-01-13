export enum ErrorStatus {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    INTERNAL_SERVER_ERROR = 500,
    I_AM_A_TEAPOT = 418, // The server refuses the attempt to brew coffee with a teapot.
    UNPROCESSABLE_ENTITY = 422, // The request was well-formed but was unable to be followed due to semantic errors.
    FAILED_DEPENDENCY = 424, // The request failed due to failure of a previous request.
    NOT_IMPLEMENTED = 501, // The request method is not supported by the server and cannot be handled. The only methods that servers are required to support (and therefore that must not return this code) are GET and HEAD.
    SERVICE_UNAVAILABLE = 503 // The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded. Note that together with this response, a user-friendly page explaining the problem should be sent.
}
