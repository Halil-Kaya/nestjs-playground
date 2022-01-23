import { ConsoleLogger } from '@nestjs/common';
import * as clc from 'cli-color';
import winston from 'winston';
import winstonRotator from 'winston-daily-rotate-file';

const fs = require('fs');

export class MyLogger extends ConsoleLogger {
    constructor(
        context: string
    ) {
        super(context);
    }

    log(location: string, ...data: any) {
        const logData = this.createLogInfoString(location, LogType.log);
        console.log(logData, ...data);
        //const compinedLogFileName = this.getCombinedLogFileName();
        //const logFileName = this.getLogFileName(LogType.log);
    }

    error(location: string, ...data: any) {
        const logData = this.createLogInfoString(location, LogType.error);
        console.error(logData, ...data);
        //const compinedLogFileName = this.getCombinedLogFileName();
        //const logFileName = this.getLogFileName(LogType.error);
    }

    warn(location: string, ...data: any) {
        const logData = this.createLogInfoString(location, LogType.warn);
        console.warn(logData, ...data);
        //const compinedLogFileName = this.getCombinedLogFileName();
        //const logFileName = this.getLogFileName(LogType.warn);
    }

    private createLogInfoString(location: string, logType: LogType) {
        switch(logType) {
            case LogType.log:
                return clc.green(`[${ this.context }]`) + clc.green(' - ') + clc.xterm(216)(`[${ super.getTimestamp() }]`) + clc.green(' - ') + clc.green(location);
            case LogType.error:
                return clc.red(`[${ this.context }]`) + clc.green(' - ') + clc.xterm(216)(`[${ super.getTimestamp() }]`) + clc.green(' - ') + clc.green(location);
            case LogType.warn:
                return clc.yellow(`[${ this.context }]`) + clc.green(' - ') + clc.xterm(216)(`[${ super.getTimestamp() }]`) + clc.green(' - ') + clc.green(location);
        }
    }

    private getLogFileName(logType: LogType) {
        switch(logType) {
            case LogType.log:
                return `log-${ this.getTodayDate() }.log`;
            case LogType.error:
                return `error-${ this.getTodayDate() }.log`;
            case LogType.warn:
                return `error-${ this.getTodayDate() }.log`;
        }
    }

    private getCombinedLogFileName() {
        return `compined-${ this.getTodayDate() }.log`;
    }

    private getTodayDate() {
        const date = new Date();
        return `${ date.getDate() }-${ (date.getMonth() + 1) }-${ date.getFullYear() }`;
    }
}

export enum LogType {
    log   = 'log',
    error = 'error',
    warn  = 'warn'
}