import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { envConfig } from "./config/env.config";
import { ValidationPipe } from "@nestjs/common";
import cors from "cors";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(envConfig.port);
}

bootstrap();
