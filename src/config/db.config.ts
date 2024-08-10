import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { envConfig } from "./env.config";
import { Auth } from "src/modules/auth/entities/auth.entity";

export const dbConfig: TypeOrmModuleOptions = {
  type: "mysql",
  host: envConfig.database.host,
  port: envConfig.database.port,
  username: envConfig.database.user,
  password: envConfig.database.password,
  database: envConfig.database.name,
  entities: [Auth],
  synchronize: true,
};
