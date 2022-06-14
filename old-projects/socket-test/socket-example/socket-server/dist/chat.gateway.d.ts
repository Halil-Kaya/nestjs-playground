export declare class ChatGateway {
    server: any;
    handleMessage(message: string): void;
    handleConnection(client: any, ...args: any[]): void;
}
