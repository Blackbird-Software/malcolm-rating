import {ExecutionContext, Inject, Injectable} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {UsersService} from "../users.service";

@Injectable()
export class GrpcAuthGuard extends AuthGuard('jwt') {

    constructor(@Inject('UsersService') private readonly usersService: UsersService) {
        super();
    }

    canActivate(context: ExecutionContext): Promise<boolean> {
        const metadata = context.switchToRpc().getContext().getMap()
        const jwtToken = metadata.authorization;

        return this.usersService.checkToken(jwtToken);
    }
}
