import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateChatDto } from "./dto/create-chat.dto";
import { UpdateChatDto } from "./dto/update-chat.dto";
import { Chat } from "./entities/chat.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PaginationDto } from "src/helpers/dto";
import { Pagination } from "src/helpers/pagination";
import { nanoid } from "nanoid";

@Injectable()
export class ChatService {
  constructor(@InjectRepository(Chat) private readonly chatRepo: Repository<Chat>) {}

  async create(createChatDto: CreateChatDto) {
    const { name } = createChatDto;
    const newChat = new Chat();

    newChat.id = nanoid(16);
    newChat.name = name;

    const savedChat = await this.chatRepo.save(newChat);

    return savedChat;
  }

  async findAll({ limit, page }: PaginationDto) {
    const totalItems = await this.chatRepo.count();
    const pagination = new Pagination(totalItems, page, limit);

    const chats = await this.chatRepo.find({
      skip: pagination.offset,
      take: pagination.limit,
    });

    return { chats, pagination };
  }

  async findOne(id: string) {
    const chat = await this.chatRepo.findOne({ where: { id } });

    if (!chat) {
      throw new NotFoundException("Чат не найден");
    }

    return chat;
  }

  async update(id: string, updateChatDto: UpdateChatDto) {
    const chat = await this.findOne(id);

    for (const key in updateChatDto) {
      if (Object.prototype.hasOwnProperty.call(chat, key)) {
        chat[key] = updateChatDto[key];
      }
    }

    const updatedChat = await this.chatRepo.save(chat);

    return updatedChat;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.chatRepo.delete(id);
  }
}
