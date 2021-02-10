import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    @Post('/register')
    @UsePipes(ValidationPipe)
    register(
        @Body() createUserDto: CreateUserDto
    ){
        return this.authService.register(createUserDto);
    }


    @Post('/login')
    @UsePipes(ValidationPipe)
    login(
        @Body() loginDto: LoginDto
    ){
        return this.authService.login(loginDto);
    }
}
