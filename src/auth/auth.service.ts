import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AccountsService } from 'src/accounts/accounts.service';
import { CreateRegisterDto } from './dtos/create-register.dto';
import { OutputRegisterDto } from './dtos/output-register.dto';
import { HashingService } from 'src/libs/hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { OutputLoginDto } from './dtos/output-login.dto';
import { CreateLoginDto } from './dtos/create-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private accountsService: AccountsService,
    private hashingService: HashingService,
    private jwtService: JwtService,
  ) {}
  async register(input: CreateRegisterDto): Promise<OutputRegisterDto> {
    const newAccount = await this.accountsService.createAccount({
      companyName: input.companyName,
      document: input.companyDocument,
    });
    const newUser = await this.usersService.create({
      accountId: String(newAccount._id),
      name: input.userName,
      email: input.userEmail,
      password: input.userPassword,
      enabled: true
    });
    return OutputRegisterDto.getInstanceFromCollection(newUser);
  }

  async signIn({ email, password }: CreateLoginDto): Promise<OutputLoginDto> {
    const user = await this.usersService.findOneBy({ email });
    if(!user.enabled){
      throw new UnauthorizedException();
    }
    const isMatch = await this.hashingService.comparePassword(
      password,
      user.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      accountId: user.accountId,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return OutputLoginDto.getInstanceFromData(accessToken);
  }
}
