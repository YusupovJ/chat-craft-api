import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Token } from "./token";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers.authorization?.split(" ")[1];

    if (!accessToken) {
      throw new UnauthorizedException("Вы должны быть авторизованы");
    }

    const token = new Token();
    const payload = token.verifyAccessToken(accessToken);

    request.userId = payload.userId;

    return true;
  }
}
