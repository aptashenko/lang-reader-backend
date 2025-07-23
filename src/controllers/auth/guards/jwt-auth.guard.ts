import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import { Request } from 'express';
import {SupabaseService} from "../../../supabase/supabase.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly supabaseService: SupabaseService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing or invalid token');
        }

        const token = authHeader.split(' ')[1];

        const { data, error } = await this.supabaseService.getClient().auth.getUser(token);
        if (error || !data.user) {
            throw new UnauthorizedException('Invalid or expired token');
        }

        // @ts-ignore
        request['user'] = data.user;
        return true;
    }
}
