import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

@WebSocketGateway()
export class ChatGateway{

    @WebSocketServer()
    server;


    @SubscribeMessage('message')
    handleMessage(@MessageBody() message : string){
        throw new Error('Invalid credentials.');
    }

    handleConnection(client: any, ...args: any[]){
        console.log('client connected')
    }

}