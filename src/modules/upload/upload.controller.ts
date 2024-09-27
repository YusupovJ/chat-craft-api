import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UploadService } from "./upload.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { uploadOptions } from "src/config/multer.config";
import { resolve } from "path";
import { Response } from "express";

@Controller("upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file", uploadOptions))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.uploadService.uploadFile(file);
  }

  @Get("/:name")
  async getFile(@Res() res: Response, @Param("name") name: string) {
    const filePath = resolve("uploads", name);
    return res.sendFile(filePath);
  }
}
