import {Body, Controller, Post, Req} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {RegisterDto} from "./dto/register.dto";
import {LoginDto} from "./dto/login.dto";
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() user: LoginDto) {
        return this.authService.login(user)
    }

    @Post('register')
    register(@Body() user: RegisterDto) {
        return this.authService.register(user)
    }

    @Post('logout')
    logout(@Req() req: Request) {
        return this.authService.logout(req)
    }
}
