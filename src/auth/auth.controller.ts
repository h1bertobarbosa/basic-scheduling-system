import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateRegisterDto } from './dtos/create-register.dto';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OutputRegisterDto } from './dtos/output-register.dto';
import { OutputLoginDto } from './dtos/output-login.dto';
import { CreateLoginDto } from './dtos/create-login.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
@ApiTags('Auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  @ApiCreatedResponse({ type: OutputRegisterDto })
  async signUp(@Body() newRegister: CreateRegisterDto) {
    return this.authService.register(newRegister);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOkResponse({ type: OutputLoginDto })
  async signIn(@Body() signInDto: CreateLoginDto) {
    return this.authService.signIn(signInDto);
  }
}
