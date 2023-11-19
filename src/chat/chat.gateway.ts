import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(80, {
  cors: true,
  cookie: true,
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  messages: string[] = [];

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    this.messages.push(data);
    this.server.emit('events', data);
    return data;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleConnection(client: Socket, ...args: any[]) {
    // const cookies = client.handshake.headers;
  }

  afterInit(_server: any) {
    console.log('init');
  }
}
