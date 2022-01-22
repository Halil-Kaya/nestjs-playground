import { ConsoleLogger } from '@nestjs/common';

export class MyLogger extends ConsoleLogger {
    error(message: any, stack?: string, context?: string) {
        console.log('loged worked');
        super.error('');
    }
}