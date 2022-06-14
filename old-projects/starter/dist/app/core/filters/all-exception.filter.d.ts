import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class AllExceptionsFilter implements ExceptionFilter {
    private logger;
    catch(exception: any, host: ArgumentsHost): any;
}
