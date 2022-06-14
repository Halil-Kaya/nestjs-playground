export interface MetaInterface {
    controller?: any;
    headers: any;
    params: any;
    status: boolean;
    timestamp: Date;
    size: number;
    [key: string]: any;
}
export interface ResponseInterface {
    data: any;
    meta: MetaInterface;
}
