import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Token } from "./token";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers.authorization?.split(" ")[1];

    if (!accessToken) {
      throw new UnauthorizedException("you must be authorized");
    }

    const token = new Token();
    token.verifyAccessToken(accessToken);

    return true;
  }
}
