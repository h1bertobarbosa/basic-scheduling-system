import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccountsModule } from 'src/accounts/accounts.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [AccountsModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
