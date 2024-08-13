import { RootEntity } from "src/helpers/root.entity";
import { Auth } from "src/modules/auth/entities/auth.entity";
import { Chat } from "src/modules/chat/entities/chat.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Message extends RootEntity {
  @Column("varchar")
  content: string;

  @ManyToOne(() => Auth)
  user: Auth;

  @ManyToOne(() => Chat)
  chat: Chat;
}
