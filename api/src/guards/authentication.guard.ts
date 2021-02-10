import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(
        private logger = new Logger('authentication-guard')
    ){}
    canActivate(context: ExecutionContext): boolean {
        const host = context.switchToHttp(),
        request = host.getRequest();
        
        const user = request["user"];

        if(!user) {
            this.logger.warn("User not authentication, denying access");
            throw new UnauthorizedException();
        }

        this.logger.log("User authenticated, access allowed");
        return true;
    }
}