import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WsResponse
} from '@nestjs/websockets';

import { Logger } from '@nestjs/common'
import { Socket,Server } from 'socket.io';

@WebSocketGateway(3001,{ path:'/websockets', serveClient : true, namespace : '/' })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() wss: Server;

    private logger : Logger = new Logger();
    

    afterInit(server: Server) {
        this.logger.log('Initialized'); 
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected ${client.id}`); 
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected ${client.id}`); 
    }
    
    @SubscribeMessage('msgToServer')
    handleMessage(client : Socket, text : string ) : void {
        this.wss.emit('msgToClient',text);
        //return {event : 'msgToClient', data : text };
    }

}
