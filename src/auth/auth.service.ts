import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AccountsService } from 'src/accounts/accounts.service';
import { CreateRegisterDto } from './dtos/create-register.dto';
import { OutputRegisterDto } from './dtos/output-register.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private accountsService: AccountsService) { }
  async register(input: CreateRegisterDto): Promise<OutputRegisterDto> {
    const newAccount = await this.accountsService.createAccount({
      companyName: input.companyName, document: input.companyDocument
    });
    const newUser = await this.usersService.create({
      accountId: String(newAccount._id),
      name: input.userName,
      email: input.userEmail,
      password: input.userPassword
    });
    return OutputRegisterDto.getInstanceFromCollection(newUser);
  }
}
