import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
// import {
//   GrantType,
//   createKindeServerClient,
// } from '@kinde-oss/kinde-typescript-sdk';

@WebSocketGateway(80, {
  cors: true,
  cookie: true,
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  messages: string[] = [];
  chatsService = new ChatService();
  // kindeClient = createKindeServerClient(GrantType.CLIENT_CREDENTIALS, {
  //   authDomain: process.env.KINDE_ISSUER_URL!,
  //   clientId: process.env.KINDE_CLIENT_ID!,
  //   clientSecret: process.env.KINDE_CLIENT_SECRET!,
  //   logoutRedirectURL: 'http://localhost:3000',
  // });
  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    this.messages.push(data);
    this.server.emit('events', data);
    return data;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handleConnection(client: Socket, ...args: any[]) {
    const id = client.handshake.auth.id;
    if (!id) return client.disconnect(true);

    const user = await this.chatsService.getUser(id);
    if (user == null) return client.disconnect(true);

    console.log('User can be maintained connected');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(_server: any) {
    console.log('init');
  }
}
