import { RootEntity } from "src/helpers/root.entity";
import { Chat } from "src/modules/chat/entities/chat.entity";
import { Column, Entity, ManyToMany } from "typeorm";

export enum EnumGender {
  man = "man",
  girl = "girl",
  steve = "steve",
  croissant = "croissant",
}

@Entity()
export class Auth extends RootEntity {
  @Column("varchar")
  username: string;

  @Column("varchar")
  password: string;

  @Column({
    type: "enum",
    enum: EnumGender,
    default: "steve",
  })
  gender: EnumGender;

  @Column("varchar", { nullable: true })
  token: string;

  @Column("integer")
  avatar: number;

  @ManyToMany(() => Chat, (chat) => chat.users)
  chats: Chat[];
}
