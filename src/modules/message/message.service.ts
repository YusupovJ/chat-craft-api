import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GetMessagesDto } from "src/helpers/dto";
import { Message } from "./entities/message.entity";
import { Repository } from "typeorm";
import { Pagination } from "src/helpers/pagination";
import { Chat } from "../chat/entities/chat.entity";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private readonly messageRepo: Repository<Message>,
    @InjectRepository(Chat) private readonly chatRepo: Repository<Chat>,
  ) {}

  async findAll({ chatId, limit, page }: GetMessagesDto) {
    const chat = await this.chatRepo.findOne({ where: { id: chatId } });

    if (!chat) {
      throw new NotFoundException("чат не найден");
    }

    const totalItems = await this.messageRepo.count({
      where: { chat: { id: chatId } },
    });
    const pagintion = new Pagination(totalItems, page, limit);

    const messages = await this.messageRepo.find({
      where: { chat: { id: chatId } },
      relations: ["user"],
      order: {
        id: "DESC",
      },
      skip: pagintion.offset,
      take: pagintion.limit,
    });

    return { messages, pagintion };
  }
}
