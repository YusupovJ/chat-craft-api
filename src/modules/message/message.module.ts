import { Module } from "@nestjs/common";
import { MessageGateway } from "./message.gateway";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "./entities/message.entity";
import { Auth } from "../auth/entities/auth.entity";
import { Chat } from "../chat/entities/chat.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Message, Auth, Chat])],
  providers: [MessageGateway],
})
export class MessageModule {}
