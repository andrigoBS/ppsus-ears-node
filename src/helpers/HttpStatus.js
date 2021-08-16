class HttpStatus {
}

HttpStatus.ok = 200; //
HttpStatus.badRequest = 400; // Client sent an invalid request — such as lacking required request body or parameter
HttpStatus.unauthorized = 401; // Client failed to authenticate with the server
HttpStatus.forbidden = 403; // Client authenticated but does not have permission to access the requested resource
HttpStatus.notFound  = 404; // The requested resource does not exist
HttpStatus.conflict = 409; //  Duplicate resource or resource already exists
HttpStatus.preconditionFailed  = 412; // One or more conditions in the request header fields evaluated to false
HttpStatus.internalServerError = 500; // A generic error occurred on the server
HttpStatus.serviceUnavailable = 503; // The requested service is not available

module.exports = HttpStatus;
