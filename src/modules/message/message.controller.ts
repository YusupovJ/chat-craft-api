import { Controller, Get, Query } from "@nestjs/common";
import { GetMessagesDto } from "src/helpers/dto";
import { MessageService } from "./message.service";
import { ApiResponse } from "src/helpers/apiResponse";

@Controller("message")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async findAll(@Query() query: GetMessagesDto) {
    const { messages, pagintion } = await this.messageService.findAll(query);
    return new ApiResponse(messages, 200, pagintion);
  }
}
