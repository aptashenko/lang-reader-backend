import {Body, Controller, Get, Patch, Req, UseGuards} from "@nestjs/common";
import {ProfileService} from "./profile.service";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import { Request } from 'express';
import {UpdateUserDto} from "./dto/update-user.dto";

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    getProfile(@Req() req: Request) {
        return this.profileService.getUserProfile(req)
    }

    @Patch('update')
    @UseGuards(JwtAuthGuard)
    updateProfile(@Req() req: Request, @Body() body: UpdateUserDto) {
        return this.profileService.updateProfile(req, JSON.parse(JSON.stringify(body)))
    }


}
