import { MetaInterface } from "src/app/interfaces/response.interface";
export declare class ResponseHelper {
    constructor();
    set(status: number, data: any, meta?: MetaInterface | any): any;
    private getSize;
}
