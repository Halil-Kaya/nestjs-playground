import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  static logs = []
  constructor(){

  }

  static getLogs(){
    return this.logs;
  }

  static addLog(log){
    this.logs.push(log)
  }
}
