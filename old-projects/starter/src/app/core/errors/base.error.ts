export class BaseError extends Error {
    constructor(
        public status:number        = 400,
        public message: string      = 'ERRORS.UNEXPECTED',
        public innerException:Error = null
    ){
        super();
        Error.apply(this,arguments);
    }
}