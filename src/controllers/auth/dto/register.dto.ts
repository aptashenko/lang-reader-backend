import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Match } from "../../../common/validators/match.decorator";

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(15)
    password: string;

    @IsString()
    @MinLength(6)
    @MaxLength(15)
    @Match('password', { message: 'Passwords do not match' })
    confirm_password: string;
}
