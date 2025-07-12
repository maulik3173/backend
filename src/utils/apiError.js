class apiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack=""
    )
    {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.stack = stack;
        this.success = false;
        this.data = null;

        if(stack){
            this.stack = stack;
        }
        else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export default apiError;


// This code defines a custom error class `apiError` that extends the built-in `Error
// class in JavaScript. It is used to create error objects with additional properties such as
// `statusCode`, `errors`, and `data`. The constructor initializes these properties and
// captures the stack trace if not provided. The class is exported for use in other parts of the application.
// This allows developers to throw structured errors in their application, making it easier
// to handle and respond to errors in a consistent manner.
// This code is useful for creating API error responses with specific status codes and 
// messages, which can be used in an Express.js application or similar frameworks.
// This code is useful for creating API error responses with specific status codes and
// messages, which can be used in an Express.js application or similar frameworks.
// The `export default apiError;` statement exports the `apiError` class so it can be imported
// and used in other modules, allowing for consistent error handling across the application.
