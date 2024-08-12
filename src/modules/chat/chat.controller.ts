import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { CreateChatDto } from "./dto/create-chat.dto";
import { UpdateChatDto } from "./dto/update-chat.dto";
import { ApiResponse } from "src/helpers/apiResponse";
import { PaginationDto } from "src/helpers/dto";
// import { AuthGuard } from "src/helpers/authGuard";

@Controller("chat")
// @UseGuards(AuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async create(@Body() createChatDto: CreateChatDto) {
    const savedChat = await this.chatService.create(createChatDto);
    return new ApiResponse(savedChat, 201);
  }

  @Get()
  async findAll(@Query() query: PaginationDto) {
    const { chats, pagination } = await this.chatService.findAll(query);
    return new ApiResponse(chats, 200, pagination);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const chat = await this.chatService.findOne(id);
    return new ApiResponse(chat);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateChatDto: UpdateChatDto) {
    const updatedChat = await this.chatService.update(id, updateChatDto);
    return new ApiResponse(updatedChat, 201);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.chatService.remove(id);

    return new ApiResponse(`Чат ${id} удален`);
  }
}
