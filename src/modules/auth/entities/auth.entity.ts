import { RootEntity } from "src/helpers/root.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Auth extends RootEntity {
  @Column("varchar")
  username: string;

  @Column("varchar")
  password: string;

  @Column("varchar")
  token: string;

  @Column("integer")
  avatar: number;
}
