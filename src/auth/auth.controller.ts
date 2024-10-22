import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateRegisterDto } from './dtos/create-register.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async signup(@Body() newRegister: CreateRegisterDto) {
    return this.authService.register(newRegister);
  }
}
