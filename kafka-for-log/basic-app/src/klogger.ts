import { ConsoleLogger, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as clc from 'cli-color';
import Producer from './producer';
const os = require('os-utils');

@Injectable()
export class KLogger extends ConsoleLogger {
    private readonly project : "Basic-App"
    private producer
    constructor(
        context: string
    ) {
        super(context);
        Producer.getProducer().then(producer => {
            this.producer = producer
        })
    }
    
    log(location: string, ...data: any) {
        const logData = this.createLogInfoString(location, LogType.log);
        console.log(logData, ...data);
        this.sendToKafka('Logs',location,data)
    }

    error(location: string, ...data: any) {
        const logData = this.createLogInfoString(location, LogType.error);
        console.error(logData, ...data);
        this.sendToKafka('Logs',location,data)
    }

    warn(location: string, ...data: any) {
        const logData = this.createLogInfoString(location, LogType.warn);
        console.warn(logData, ...data);
        this.sendToKafka('Logs',location,data)
    }

    sendToKafka(topic : string,location,...data){
        const logPackage = {
            project : 'Basic-App',
            location : location,
            context : this.context,
            data : {
                ...data
            },
            date : Date.now()
        }
        try{
            this.producer.send({
                topic : topic,
                messages : [
                    {
                        value:JSON.stringify(logPackage),
                        partition : 0
                    }
                ]
            })
            .then(r => {
                console.log(r)
            })
        }catch(e){

        }
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
