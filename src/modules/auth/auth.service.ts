import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "./entities/auth.entity";
import { Repository } from "typeorm";
import { compare, compareSync, hashSync } from "bcrypt";
import token from "src/helpers/token";
import { ApiResponse } from "src/helpers/apiResponse";
import { refreshDto } from "./dto/refresh.dto";

@Injectable()
export class AuthService {
  constructor(@InjectRepository(Auth) private readonly authService: Repository<CreateAuthDto>) {}
  async create(createAuthDto: CreateAuthDto) {
    const newUser = new Auth();

    const user = await this.authService.find({ where: { username: createAuthDto.username } });

    if (user) {
      throw new BadRequestException("пользователь уже существует");
    }

    newUser.username = createAuthDto.username;
    newUser.avatar = createAuthDto.avatar;
    newUser.password = hashSync(createAuthDto.password, 3);
    const accessToken = token.generateAccessToken({ userId: createAuthDto.id });
    const refreshToken = token.generateRefreshToken({ userId: createAuthDto.id });
    newUser.token = hashSync(refreshToken, 3);

    await this.authService.save(newUser);

    return new ApiResponse({ accessToken, refreshToken });
  }

  async login(body: CreateAuthDto) {
    const user = await this.authService.findOne({ where: { id: body.id } });
    if (!user) {
      throw new NotFoundException("пользователь не найден");
    }

    const checkPassword = compareSync(body.password, user.password);
    if (!checkPassword) {
      throw new BadRequestException("неверный пароль");
    }

    const accessToken = token.generateAccessToken({ userId: body.id });
    const refreshToken = token.generateRefreshToken({ userId: body.id });

    user.token = hashSync(refreshToken, 3);

    await this.authService.save(user);

    return new ApiResponse({ accessToken, refreshToken });
  }

  async me(id: number) {
    const user = await this.authService.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException("пользователь не найден");
    }
    return new ApiResponse(user);
  }

  async refresh(body: refreshDto) {
    const { userId } = token.verifyRefreshToken(body.refreshToken);

    const user = await this.authService.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("пользователь не найден");
    }

    const checkToken = compareSync(body.refreshToken, user.token);
    if (!checkToken) {
      throw new UnauthorizedException("неверный Токен");
    }

    const accessToken = token.generateAccessToken({ userId: user.id });
    const refreshToken = token.generateRefreshToken({ userId: user.id });
    user.token = hashSync(refreshToken, 3);

    await this.authService.save(user);

    return new ApiResponse({ accessToken, refreshToken });
  }
}
