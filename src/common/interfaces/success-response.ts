import {User} from "@supabase/supabase-js";

export interface SuccessResponse<T> {
    data: T;
    message?: string;
}

export interface AuthSuccessResponse {
    data?: {
        user: User | undefined | null,
        token: string | null | undefined
    };
    message: string;
}
