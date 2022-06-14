import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    test(request: any, response: any): Promise<void>;
    upload(file: any): Promise<unknown>;
    uploadTest(request: any, response: any, body: any): Promise<void>;
}
