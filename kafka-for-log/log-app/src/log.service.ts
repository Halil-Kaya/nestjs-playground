import { Injectable } from '@nestjs/common';
import { AppService } from './app.service';
import Consumer from './consumer';

@Injectable()
export class LogService {
    private consumer
    constructor(){
        this.startConsumer()
    }

    async startConsumer(){
        try{
            this.consumer = await Consumer.getConsumer()
            await this.consumer.subscribe({
                topic : 'Logs',
                fromBeginning : true
            })
            await this.consumer.run({
                eachMessage : async result =>{
                    const reveivedPackage = JSON.parse(result.message.value)
                    AppService.addLog(reveivedPackage)
                }
            })
        }catch(e){
            console.log(e)
        }
    }

}
