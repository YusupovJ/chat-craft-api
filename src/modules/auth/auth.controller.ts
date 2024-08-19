import { Controller, Get, Post, Body, UseGuards, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { AuthGuard } from "src/helpers/authGuard";
import { IRequest } from "src/helpers/types";
import { refreshDto } from "./dto/refresh.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  async create(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.create(createAuthDto);
  }

  @Post("/login")
  async login(@Body() body: CreateAuthDto) {
    return this.authService.login(body);
  }

  @Get("me")
  @UseGuards(AuthGuard)
  async me(@Req() req: IRequest) {
    return await this.authService.me(req.userId);
  }

  @Post("/refresh")
  update(@Body() body: refreshDto) {
    return this.authService.refresh(body);
  }

  @Post("/logout")
  @UseGuards(AuthGuard)
  async logout(@Req() req: IRequest) {
    return await this.authService.logout(req.userId);
  }
}
