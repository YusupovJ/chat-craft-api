import { Injectable } from "@nestjs/common";
import { envConfig } from "src/config/env.config";

@Injectable()
export class UploadService {
  async uploadFile(file: Express.Multer.File) {
    return {
      filename: file.filename,
      size: file.size,
      originalname: file.originalname,
      mimetype: file.mimetype,
      url: `${envConfig.apiUrl}/upload/${file.filename}`,
    };
  }

  async uploadMultipleFiles(files: Express.Multer.File[]) {
    const filenames = files.map((file) => ({
      filename: file.filename,
      size: file.size,
      originalname: file.originalname,
      mimetype: file.mimetype,
      url: `${envConfig.apiUrl}/upload/${file.filename}`,
    }));

    return { filenames };
  }
}
