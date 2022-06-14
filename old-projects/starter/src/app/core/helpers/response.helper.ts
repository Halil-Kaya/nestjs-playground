import { Injectable } from "@nestjs/common";
import { MetaInterface, ResponseInterface } from "src/app/interfaces/response.interface";

@Injectable()
export class ResponseHelper {

    constructor(){}

    //response olarak datayi bu formatta donduruyorum
    public set(status:number, data:any, meta:MetaInterface | any = null):any {
        return <ResponseInterface>{
            data:data,
            meta: {
                status,
                timestamp : new Date(),
                size : this.getSize(data),
                ...meta
            }
        };

    }

    //data arrayse array uzunlugunu, normal bir dataysa '1', boş bir eleman (null,undefined,false) ise '0' donuyor
    private getSize(data: any) : number {
        return <number> ((data instanceof Array) ? data.length : (!data ? 0 : 1));
    }

}