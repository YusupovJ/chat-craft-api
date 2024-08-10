import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dbConfig } from "./config/db.config";
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), AuthModule],
})
export class AppModule {}
