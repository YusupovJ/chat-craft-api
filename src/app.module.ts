import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dbConfig } from "./config/db.config";
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), ChatModule],
})
export class AppModule {}
