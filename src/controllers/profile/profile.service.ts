import {Injectable} from "@nestjs/common";
import {SuccessResponse} from "../../common/interfaces/success-response";
import {IUser} from "./interfaces/user.interface";
import {SupabaseService} from "../../supabase/supabase.service";
import {Request} from "express";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class ProfileService {
    constructor(private readonly supabaseService: SupabaseService) {}

    async getUserProfile(req: Request): Promise<SuccessResponse<IUser>>  {
        // @ts-ignore
        const userId = req.user?.id;

        if (!userId) {
            throw new Error('User ID not found in request');
        }

        const {data} = await this.supabaseService.getClient()
            // @ts-ignore
            .from<IUser>('user_profiles')
            .select('*')
            .eq('user_id', userId)
            .single()

        return {
            data,
            message: 'user data'
        }
    }

    async updateProfile(req: Request, body: UpdateUserDto): Promise<SuccessResponse<IUser>> {
        // @ts-ignore
        const userId = req.user?.id;

        if (!userId) {
            throw new Error('User ID not found in request');
        }

        const { data, error } = await this.supabaseService.getClient()
            // @ts-ignore
            .from<IUser>('user_profiles')
            .update(body)
            .eq('user_id', userId)
            .select('*')
            .single();

        console.log(error)

        if (error || !data) {
            throw new Error('Update failed');
        }

        return {
            data,
            message: 'update profile'
        }
    }
}
