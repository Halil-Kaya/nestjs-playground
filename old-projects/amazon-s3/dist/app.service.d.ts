import { S3 } from 'aws-sdk';
export declare class AppService {
    upload(file: any): Promise<unknown>;
    getUrl(fileName: string): Promise<string>;
    uploadS3(file: any, bucket: any, name: any): Promise<unknown>;
    getS3(): S3;
}
