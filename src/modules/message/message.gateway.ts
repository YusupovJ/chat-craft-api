import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { CreateMessageDto, CreateVoiceDto } from "./dto/create-message.dto";
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

  @SubscribeMessage("joinRoom")
  handleJoinRoom(client: Socket, payload: { chatId: string; userId: string }) {
    const { chatId } = payload;
    client.join(chatId);
  }

  @SubscribeMessage("leaveRoom")
  handleLeaveRoom(client: Socket, payload: { chatId: string }) {
    const { chatId } = payload;
    client.leave(chatId);
  }

  @SubscribeMessage("message")
  async handleMessage(client: Socket, message: CreateMessageDto) {
    const user = await this.authRepo.findOne({ where: { id: message.userId } });
    if (!user) throw new NotFoundException("пользователь не найден");

    const chat = await this.chatRepo.findOne({ where: { id: message.chatId } });
    if (!chat) throw new NotFoundException("чат не найден");

    const newMessage = new Message();
    newMessage.content = message.content;
    newMessage.type = message.type;
    newMessage.user = user;
    newMessage.chat = chat;

    await this.messageRepo.save(newMessage);

    this.server.to(chat.id).emit("reply", newMessage);
  }

  @SubscribeMessage("voice")
  async handleVoice(client: Socket, message: CreateVoiceDto) {
    console.log(message);
  }
}
