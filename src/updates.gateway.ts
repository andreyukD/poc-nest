import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class UpdatesGateway {
    @WebSocketServer()
    server: Server;

    sendUpdate(event: string, data: any) {
        this.server.emit(event, data);
    }
}