import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {SupabaseService} from "../../supabase/supabase.service";
import {AuthSuccessResponse} from "../../common/interfaces/success-response";
import {RegisterDto} from "./dto/register.dto";
import {LoginDto} from "./dto/login.dto";
import { Request } from 'express';
import {IUser} from "../profile/interfaces/user.interface";
import {User} from "@supabase/supabase-js";

@Injectable()
export class AuthService {
    constructor(private readonly supabaseService: SupabaseService) {}

    async register(user: RegisterDto): Promise<AuthSuccessResponse> {
        const {data, error} = await this.supabaseService.getClient()
            .auth.signUp({
                email: user.email,
                password: user.password,
            })

        if (error) {
            console.log(error)

            const field =
                error.message.toLowerCase().includes('email') ? 'email' : 'password';

            throw new HttpException({
                errors: {
                    [field]: [error.message]
                },
            }, HttpStatus.UNAUTHORIZED);
        }

        return {
            message: 'Registration successful.',
            data: {
                user: data.user,
                token: data.session?.access_token
            }
        }
    }

    async login(user: LoginDto): Promise<AuthSuccessResponse> {
        const { data, error } = await this.supabaseService.getClient()
            .auth.signInWithPassword({
                email: user.email,
                password: user.password,
            })

        if (error) {
            const field =
                error.message.toLowerCase().includes('email') ? 'email' : 'password';

            throw new HttpException({
                errors: {
                    [field]: [error.message],
                },
            }, HttpStatus.UNAUTHORIZED);
        }

        return {
            message: 'Login successful',
            data: {
                user: data.user,
                token: data.session?.access_token
            }
        }
    }

    async logout(req: Request): Promise<{ message: string }> {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            throw new HttpException('Authorization header missing', HttpStatus.BAD_REQUEST);
        }

        const token = authHeader.replace('Bearer ', '');

        const client = this.supabaseService.getClientWithToken(token);
        const { error } = await client.auth.signOut();
        if (error) {
            throw new HttpException({
                errors: {
                    token: [error.message],
                },
            }, HttpStatus.BAD_REQUEST);
        }

        return {
            message: 'Logout successful',
        };
    }
}
