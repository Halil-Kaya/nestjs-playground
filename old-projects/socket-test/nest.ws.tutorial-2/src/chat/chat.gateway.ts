import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket,Server } from 'socket.io';
import { Logger } from '@nestjs/common'

@WebSocketGateway({ namespace : '/chat' })
export class ChatGateway implements OnGatewayInit{
    
    @WebSocketServer() wss: Server;

    afterInit(server: any) {
        this.logger.log('Initialized!')
    }
 
    private logger : Logger = new Logger('ChatGateway')

    @SubscribeMessage('chatToServer')
    handleEvent(client : Socket, message : { sender: string, room : string, message:string }) {
        this.wss.to(message.room).emit('chatToClient',message)
    }

    @SubscribeMessage('joinRoom')
    handleJoinRoom(client : Socket, room : string){
        client.join(room);
        client.emit('joinedRoom',room)
    }

    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(client : Socket, room : string){
        client.leave(room)
        client.emit('leftRoom',room)
    }

}