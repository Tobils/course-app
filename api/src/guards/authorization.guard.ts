import { CanActivate, ExecutionContext, ForbiddenException, Injectable, Logger, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AuthorizationGuard implements CanActivate {

    constructor(
        private allowedRoles: string[],
        private logger = new Logger('autthorization-guard')
    ){}


    canActivate(context: ExecutionContext): boolean {
        const host = context.switchToHttp(),
        request = host.getRequest();
        
        const user = request["user"];

        const allowed = this.isAllowed(user.roles);
        this.logger.log(`is user allowed : ${allowed}`)

        if(!allowed) {
            this.logger.warn("User not authorized, denying access");
            throw new ForbiddenException();
        }

        this.logger.log("User authorized, access allowed");
        return true;
    }

    isAllowed(userRoles: string[])
    {
        this.logger.log(`comparing rooles ${this.allowedRoles} - ${userRoles}`)
        let allowed = false;

        userRoles.forEach(userRole => {
            if(!allowed && this.allowedRoles.includes(userRole)){
                allowed = true;
            }
        })

        return allowed;
    }
}