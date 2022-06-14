export declare class BaseError extends Error {
    status: number;
    message: string;
    innerException: Error;
    constructor(status?: number, message?: string, innerException?: Error);
}
