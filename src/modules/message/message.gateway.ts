import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { CreateMessageDto } from "./dto/create-message.dto";
import { ISocket } from "src/helpers/types";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "../auth/entities/auth.entity";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { Chat } from "../chat/entities/chat.entity";
import { Message } from "./entities/message.entity";

@WebSocketGateway({ cors: { origin: "*" } })
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectRepository(Auth) private readonly authRepo: Repository<Auth>,
    @InjectRepository(Chat) private readonly chatRepo: Repository<Chat>,
    @InjectRepository(Message) private readonly messageRepo: Repository<Message>,
  ) {}

  @SubscribeMessage("message")
  async handleMessage(client: ISocket, message: CreateMessageDto) {
    client.join(message.chatId);
    client.emit("reply", message.content);

    const user = await this.authRepo.findOne({ where: { id: message.userId } });
    if (!user) throw new NotFoundException("пользователь не найден");

    const chat = await this.chatRepo.findOne({ where: { id: message.chatId } });
    if (!chat) throw new NotFoundException("чат не найден");

    const newMessage = new Message();

    newMessage.content = message.content;
    newMessage.user = user;
    newMessage.chat = chat;

    await this.messageRepo.save(newMessage);

    client.broadcast.to(chat.id).emit("reply", message.content);
  }
}
