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
    // TODO: FIx user authentication (pass user id from the client)
    const cookies = client.handshake.headers.cookie;
    const serializedCookies = cookies.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.split('=');
      return {
        ...acc,
        [key.trim()]: value,
      };
    }, {});
    console.log(serializedCookies);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(_server: any) {
    console.log('init');
  }
}
