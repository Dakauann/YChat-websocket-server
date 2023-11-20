import { Module } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [],
  providers: [ChatGateway],
})
export class AppModule {}
